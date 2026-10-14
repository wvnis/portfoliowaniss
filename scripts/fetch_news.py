"""Build a static, attributed news index from the configured RSS/Atom feeds."""
import concurrent.futures
import hashlib
import html
import json
import re
import unicodedata
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
MAX_BYTES = 2_000_000
ATOM = "{http://www.w3.org/2005/Atom}"
AI = re.compile(r"\b(ia|ai|llm|chatgpt|openai|claude|anthropic|gemini|copilot|deepseek|mistral|grok|hugging face|intelligence artificielle|intelligences artificielles|machine learning|agents? ia)\b", re.I)
DEV = re.compile(r"\b(developpement|developpeurs?|developer|programmation|programming|javascript|typescript|python|react|next\.js|html|css|sql|github|gitlab|api|apis|webdev|coding|vibe coding|code source|open source|wordpress|framework)\b", re.I)


def plain_text(value):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", value)).split())[:350]


def topic(text):
    normalized = "".join(char for char in unicodedata.normalize("NFKD", text) if not unicodedata.combining(char))
    if AI.search(normalized):
        return "IA"
    if DEV.search(normalized):
        return "Développement"
    return None


def parse_date(value):
    try:
        date = parsedate_to_datetime(value)
    except (ValueError, TypeError, IndexError):
        try:
            date = datetime.fromisoformat(value.replace("Z", "+00:00"))
        except (ValueError, TypeError):
            return None
    if date.tzinfo is None:
        date = date.replace(tzinfo=timezone.utc)
    return date.astimezone(timezone.utc)


def parse_feed(raw, source, now=None):
    now = now or datetime.now(timezone.utc)
    root = ET.fromstring(raw)
    is_atom = root.tag == ATOM + "feed"
    if is_atom:
        items = root.findall(ATOM + "entry")
    elif root.tag == "rss" and root.find("channel") is not None:
        items = root.findall("channel/item")
    else:
        raise ValueError("Not a supported RSS or Atom feed")
    articles = []
    seen = set()
    for item in items:
        prefix = ATOM if is_atom else ""
        title = plain_text(item.findtext(prefix + "title", ""))
        tags = " ".join((tag.get("term", "") if is_atom else tag.text or "") for tag in item.findall(prefix + "category"))
        category = topic(title + " " + tags)
        if any(term in tags.lower() for term in ("bons plans", "bons-plans", "bon plan")):
            continue
        if not title or not category:
            continue
        link = item.findtext("link", "")
        if is_atom:
            link = next((node.get("href", "") for node in item.findall(ATOM + "link") if node.get("rel", "alternate") == "alternate"), "")
        link = urljoin(source["url"], link)
        if "/bons-plans/" in link:
            continue
        parsed = urlsplit(link)
        if parsed.scheme not in ("http", "https") or not parsed.hostname or parsed.username or link in seen:
            continue
        # Only link articles hosted by the source that supplied the feed.
        host = urlsplit(source["url"]).hostname
        if parsed.hostname != host:
            continue
        date = parse_date(item.findtext(ATOM + "published", item.findtext(ATOM + "updated", "")) if is_atom else item.findtext("pubDate", ""))
        if date is None or date < now - timedelta(days=60) or date > now + timedelta(days=1):
            continue
        seen.add(link)
        articles.append({"id": hashlib.sha256(link.encode()).hexdigest()[:16], "title": title, "url": link, "sourceId": source["id"], "source": source["name"], "category": category, "date": date.isoformat()})
    return articles


def fetch_source(source):
    request = urllib.request.Request(source["feed"], headers={"User-Agent": "WanissPortfolioNews/1.0 (+https://wvnis.github.io/portfoliowaniss/)", "Accept": "application/rss+xml, application/atom+xml, application/xml"})
    with urllib.request.urlopen(request, timeout=25) as response:
        raw = response.read(MAX_BYTES + 1)
    if len(raw) > MAX_BYTES:
        raise ValueError("Feed exceeds maximum size")
    return parse_feed(raw, source)


def collect_news(sources, previous, fetch=fetch_source, now=None):
    now = now or datetime.now(timezone.utc)
    articles = []
    warnings = []
    successes = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(fetch, source): source for source in sources}
        for future in concurrent.futures.as_completed(futures):
            source = futures[future]
            try:
                articles.extend(future.result())
                successes += 1
            except Exception as error:
                print(f"Warning: {source['name']}: {type(error).__name__}")
                warnings.append(source["id"])
                articles.extend(item for item in previous.get("articles", []) if item.get("sourceId") == source["id"])
    # Retain recent cached items as feeds only expose their latest entries.
    articles.extend(item for item in previous.get("articles", []) if item.get("sourceId") in {source["id"] for source in sources})
    recent = {}
    for article in articles:
        date = parse_date(article["date"])
        if date and now - timedelta(days=60) <= date <= now + timedelta(days=1) and "/bons-plans/" not in article["url"]:
            recent.setdefault(article["url"], article)
    return {"updatedAt": now.isoformat() if successes else previous.get("updatedAt"), "sources": [{key: source[key] for key in ("id", "name", "url")} for source in sources], "articles": sorted(recent.values(), key=lambda article: article["date"], reverse=True)[:60], "warnings": sorted(warnings)}


def main():
    sources = json.loads((ROOT / "data/news-sources.json").read_text(encoding="utf-8"))
    destination = ROOT / "public/news.json"
    try:
        previous = json.loads(destination.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        previous = {}
    data = collect_news(sources, previous)
    destination.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"News index: {len(data['articles'])} articles; {len(data['warnings'])} source warnings")
    if len(data["warnings"]) == len(sources) and not data["articles"]:
        raise SystemExit("All news sources failed and no cache is available")


if __name__ == "__main__":
    main()
