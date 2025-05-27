from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import pymongo
from hackernews_scraper.spiders.hackernews import HackerNewsSpider
from dotenv import load_dotenv
import os

load_dotenv()
# Get Scrapy settings
settings = get_project_settings()

# Ensure MongoDB pipeline is enabled
if 'hackernews_scraper.pipelines.MongoPipeline' not in settings.get('ITEM_PIPELINES', {}):
    settings.set('ITEM_PIPELINES', {
        'hackernews_scraper.pipelines.MongoPipeline': 300,
    })

# Set logging level to DEBUG for more detailed information
settings.set('LOG_LEVEL', 'DEBUG')

# Increase the limit for response size (default is 1MB)
settings.set('DOWNLOAD_MAXSIZE', 10485760)  # 10MB

# Increase the limit for request size
settings.set('DOWNLOAD_WARNSIZE', 5242880)  # 5MB

# Increase the timeout for downloading
settings.set('DOWNLOAD_TIMEOUT', 180)  # 3 minutes

# MongoDB connection settings
mongo_uri = os.environ["MONGO_URI"]
mongo_db = "web_scraper"
collection_name = "scraped_data"

settings.set('MONGO_URI', mongo_uri)
settings.set('MONGO_DATABASE', mongo_db)

# Test MongoDB connection
try:
    client = pymongo.MongoClient(mongo_uri)
    client.server_info()  # Will raise an exception if connection fails
    print(f"Successfully connected to MongoDB at {mongo_uri}")
    print(f"Data will be saved to database: {mongo_db}, collection: {collection_name}")
    client.close()
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    print("Please make sure MongoDB is running on your machine.")
    exit(1)

# Start the crawler process
process = CrawlerProcess(settings=settings)
process.crawl(HackerNewsSpider)
process.start()