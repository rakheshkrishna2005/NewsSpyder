import scrapy

class ArticleItem(scrapy.Item):
    title = scrapy.Field()
    url = scrapy.Field()
    summary = scrapy.Field()
    date = scrapy.Field()
    scraped_at = scrapy.Field()
    content = scrapy.Field()
    source = scrapy.Field()
