BOT_NAME = "hackernews_scraper"
SPIDER_MODULES = ["hackernews_scraper.spiders"]
NEWSPIDER_MODULE = "hackernews_scraper.spiders"

ROBOTSTXT_OBEY = True

# Enable pipelines
ITEM_PIPELINES = {
    'hackernews_scraper.pipelines.MongoPipeline': 300,
}

# Increase the limit for response size (default is 1MB)
DOWNLOAD_MAXSIZE = 10485760  # 10MB

# Increase the limit for request size
DOWNLOAD_WARNSIZE = 5242880  # 5MB

# Increase the timeout for downloading
DOWNLOAD_TIMEOUT = 180  # 3 minutes

LOG_LEVEL = "INFO"
