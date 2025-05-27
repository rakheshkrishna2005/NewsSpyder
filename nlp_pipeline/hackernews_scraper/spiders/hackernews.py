import scrapy
from datetime import datetime
from hackernews_scraper.items import ArticleItem
import tzlocal


class HackerNewsSpider(scrapy.Spider):
    name = "hackernews"
    allowed_domains = ["thehackernews.com"]
    start_urls = ["https://thehackernews.com/"]

    def parse(self, response):
        # Select each article container on the homepage
        articles = response.css("div.body-post.clear")

        for article in articles:
            url = article.css("a.story-link::attr(href)").get()
            title = article.css("h2.home-title::text").get()
            desc = article.css("div.home-desc::text").get()
            date = article.css("span.h-datetime::text").get()

            yield response.follow(
                url,
                callback=self.parse_article,
                meta={
                    "url": url,
                    "title": title.strip() if title else "",
                    "desc": desc.strip() if desc else "",
                    "date": date.strip() if date else "",
                }
            )

    def parse_article(self, response):
        # Locate the article content area
        article_body = response.css("div.articlebody > div[itemprop='articleBody']")

        if not article_body:
            self.logger.warning(f"Main articleBody not found for URL: {response.url}")
            # Try alternative containers
            article_body = response.css("div.articlebody") or response.css("div.post-body")

        if not article_body:
            self.logger.error(f"No article body found at all. Skipping URL: {response.url}")
            return

        # Clean paragraph-based extraction
        paragraphs = article_body.css("p ::text").getall()
        cleaned_paragraphs = [p.strip() for p in paragraphs if p.strip()]
        content = "\n\n".join(cleaned_paragraphs)

        # Fallback: If no content, use raw full-text extraction
        if not content.strip():
            fallback_text = article_body.xpath("string(.)").get()
            content = fallback_text.strip() if fallback_text else ""
            self.logger.info(f"Used fallback full-text extraction for URL: {response.url}")

        # Prepare the item
        item = ArticleItem()
        local_tz = tzlocal.get_localzone()
        item["title"] = response.meta["title"]
        item["url"] = response.meta["url"]
        item["summary"] = response.meta["desc"]
        item["date"] = response.meta["date"]
        item["scraped_at"] = datetime.now(local_tz).isoformat()
        item["content"] = content
        item["source"] = "https://thehackernews.com"

        self.logger.info(f"Scraped: {item['title']} | Content length: {len(content)} characters")

        yield item

# import scrapy
# from datetime import datetime
# from hackernews_scraper.items import ArticleItem
# import tzlocal

# class HackerNewsSpider(scrapy.Spider):
#     name = "hackernews"
#     allowed_domains = ["thehackernews.com"]
#     start_urls = ["https://thehackernews.com/"]

#     def parse(self, response):
#         # Select each article container on homepage
#         articles = response.css("div.body-post.clear")
#         for article in articles:
#             url = article.css("a.story-link::attr(href)").get()
#             title = article.css("h2.home-title::text").get()
#             desc = article.css("div.home-desc::text").get()
#             date = article.css("span.h-datetime::text").get()

#             # Follow each article's URL for full content
#             yield response.follow(
#                 url,
#                 callback=self.parse_article,
#                 meta={
#                     "url": url,
#                     "title": title.strip() if title else "",
#                     "desc": desc.strip() if desc else "",
#                     "date": date.strip() if date else "",
#                 }
#             )

#     def parse_article(self, response):
#         # Get the main article body
#         article_body = response.css("div.articlebody > div[itemprop='articleBody']")
        
#         if not article_body:
#             self.logger.warning(f"Article body not found for URL: {response.url}")
#             # Try alternative selectors
#             article_body = response.css("div.articlebody") or response.css("div.post-body")
        
#         # Method 1: Extract all text from paragraphs, including nested elements
#         content_paragraphs = []
        
#         # Get all paragraphs
#         paragraphs = article_body.css("p")
#         for p in paragraphs:
#             # Get all text from this paragraph, including text in nested elements
#             paragraph_text = "".join(p.css("*::text").getall()).strip()
#             if paragraph_text:
#                 content_paragraphs.append(paragraph_text)
        
#         # Method 2: Get all text directly from the article body
#         # This will include text that might not be in paragraph tags
#         all_text = article_body.css("*::text").getall()
#         all_text = [text.strip() for text in all_text if text.strip()]
#         full_content = "\n".join(all_text)
        
#         # Choose the method that gives more content
#         method1_content = "\n\n".join(content_paragraphs)
        
#         # Use the method that gives more content
#         if len(full_content) > len(method1_content):
#             content = full_content
#             self.logger.info(f"Using full text extraction (more content): {len(full_content)} vs {len(method1_content)} characters")
#         else:
#             content = method1_content
#             self.logger.info(f"Using paragraph extraction (more content): {len(method1_content)} vs {len(full_content)} characters")
        
#         # Create the item
#         item = ArticleItem()
#         local_tz = tzlocal.get_localzone()
#         item["title"] = response.meta["title"]
#         item["url"] = response.meta["url"]
#         item["summary"] = response.meta["desc"]
#         item["date"] = response.meta["date"]
#         item["scraped_at"] = datetime.now(local_tz).isoformat()
#         item["content"] = content
#         item["source"] = "https://thehackernews.com"
        
#         # Log content length for debugging
#         self.logger.info(f"Scraped article: {item['title']} - Content length: {len(content)} characters")
        
#         yield item
