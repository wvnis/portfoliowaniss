import unittest
import json
import tempfile
from datetime import datetime, timedelta, timezone
from io import BytesIO
from pathlib import Path
from unittest.mock import patch
from fetch_news import collect_news, load_previous, parse_feed

NOW = datetime(2026, 10, 14, tzinfo=timezone.utc)
SOURCE = {"id": "sample", "name": "Sample", "url": "https://example.com/", "feed": "https://example.com/feed"}


class NewsTests(unittest.TestCase):
    def test_rss_filters_topics_sanitizes_titles_and_deduplicates(self):
        raw = b'''<rss><channel>
          <item><title><![CDATA[<b>ChatGPT</b> &amp; API]]></title><link>https://example.com/ai</link><pubDate>Tue, 13 Oct 2026 10:00:00 GMT</pubDate></item>
          <item><title>ChatGPT</title><link>https://example.com/ai</link><pubDate>Tue, 13 Oct 2026 10:00:00 GMT</pubDate></item>
          <item><title>Promotion telephone</title><link>https://example.com/phone</link><pubDate>Tue, 13 Oct 2026 10:00:00 GMT</pubDate></item>
          <item><title>Python</title><link>javascript:alert(1)</link><pubDate>Tue, 13 Oct 2026 10:00:00 GMT</pubDate></item>
          <item><title>Python</title><link>https://elsewhere.com/spam</link><pubDate>Tue, 13 Oct 2026 10:00:00 GMT</pubDate></item>
        </channel></rss>'''
        articles = parse_feed(raw, SOURCE, NOW)
        self.assertEqual(len(articles), 1)
        self.assertEqual(articles[0]["title"], "ChatGPT & API")
        self.assertEqual(articles[0]["category"], "IA")

    def test_atom_and_outdated_items(self):
        raw = b'''<feed xmlns="http://www.w3.org/2005/Atom">
          <entry><title>React update</title><link href="https://example.com/react"/><updated>2026-10-13T10:00:00Z</updated></entry>
          <entry><title>Python update</title><link href="https://example.com/old"/><updated>2025-01-01T10:00:00Z</updated></entry>
        </feed>'''
        articles = parse_feed(raw, SOURCE, NOW)
        self.assertEqual(len(articles), 1)
        self.assertEqual(articles[0]["category"], "Développement")

    def test_failed_feed_retains_cache_and_timestamp(self):
        article = {"id": "a", "title": "Python", "sourceId": "sample", "url": "https://example.com/python", "date": "2026-10-13T10:00:00+00:00"}
        previous = {"articles": [article], "updatedAt": "2026-10-13T10:00:00+00:00"}
        def failed(_):
            raise OSError("offline")
        result = collect_news([SOURCE], previous, failed, NOW)
        self.assertEqual(result["articles"], [article])
        self.assertEqual(result["warnings"], ["sample"])
        self.assertEqual(result["updatedAt"], previous["updatedAt"])

    def test_invalid_feed_is_not_silent_success(self):
        with self.assertRaises(ValueError):
            parse_feed(b"<html><body>Unavailable</body></html>", SOURCE, NOW)

    def test_rolling_week_removes_expired_and_future_feed_items(self):
        raw = b'''<rss><channel>
          <item><title>Python boundary</title><link>https://example.com/boundary</link><pubDate>Wed, 07 Oct 2026 00:00:00 GMT</pubDate></item>
          <item><title>Python expired</title><link>https://example.com/expired</link><pubDate>Tue, 06 Oct 2026 23:59:59 GMT</pubDate></item>
          <item><title>Python future</title><link>https://example.com/future</link><pubDate>Thu, 15 Oct 2026 00:00:00 GMT</pubDate></item>
        </channel></rss>'''
        articles = parse_feed(raw, SOURCE, NOW)
        self.assertEqual([article["url"] for article in articles], ["https://example.com/boundary"])

    def test_expired_cache_is_removed_even_when_source_fails(self):
        previous = {"articles": [
            {"id": "old", "sourceId": "sample", "url": "https://example.com/old", "date": (NOW - timedelta(days=7, seconds=1)).isoformat()},
            {"id": "recent", "sourceId": "sample", "url": "https://example.com/recent", "date": (NOW - timedelta(days=6)).isoformat()},
        ]}
        def failed(_):
            raise OSError("offline")
        result = collect_news([SOURCE], previous, failed, NOW)
        self.assertEqual([article["id"] for article in result["articles"]], ["recent"])

    def test_daily_history_retains_articles_missing_from_new_feed(self):
        first_article = {"id": "first", "sourceId": "sample", "url": "https://example.com/first", "date": NOW.isoformat()}
        next_article = {"id": "next", "sourceId": "sample", "url": "https://example.com/next", "date": (NOW + timedelta(days=1)).isoformat()}
        first_day = collect_news([SOURCE], {}, lambda _: [first_article], NOW)
        next_day = collect_news([SOURCE], first_day, lambda _: [next_article], NOW + timedelta(days=1))
        self.assertEqual([article["id"] for article in next_day["articles"]], ["next", "first"])
        week_later = collect_news([SOURCE], next_day, lambda _: [], NOW + timedelta(days=8))
        self.assertEqual([article["id"] for article in week_later["articles"]], ["next"])

    def test_published_history_is_merged_with_local_snapshot(self):
        def article(identifier):
            return {"id": identifier, "title": "Python", "url": f"https://example.com/{identifier}", "sourceId": "sample", "source": "Sample", "category": "Développement", "date": NOW.isoformat()}
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "news.json"
            destination.write_text(json.dumps({"articles": [article("local")]}), encoding="utf-8")
            with patch("fetch_news.urllib.request.urlopen", return_value=BytesIO(json.dumps({"articles": [article("published")]}).encode())):
                previous = load_previous(destination, [SOURCE], "https://example.com/news.json")
            self.assertEqual({entry["id"] for entry in previous["articles"]}, {"local", "published"})


if __name__ == "__main__":
    unittest.main()
