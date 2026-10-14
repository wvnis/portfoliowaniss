import unittest
from datetime import datetime, timezone
from fetch_news import collect_news, parse_feed

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


if __name__ == "__main__":
    unittest.main()
