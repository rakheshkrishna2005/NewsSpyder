import pymongo
from datetime import datetime, timedelta
import google.generativeai as gen_ai
from pymongo.errors import PyMongoError
import os
import sys
from dotenv import load_dotenv
import tzlocal
from dateutil import parser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

gen_ai.configure(api_key=GEMINI_API_KEY)
model = gen_ai.GenerativeModel("gemini-2.0-flash-exp")

mongo_uri = os.environ.get("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client["web_scraper"]
source_collection = db["scraped_data"]
target_collection = db["structured_articles"]

def format_prompt(doc):
    return f"""
You are a technical blog writer.

Structure the following scraped article into a detailed blog post with:

- Title (catchy and clear)
- Introduction (1 paragraph)
- Bullet Summary (3–5 concise points)
- Key Technical Insights (multiple paragraphs)
- Conclusion (wrap-up with relevance)

Use clear headings. Write in a professional, informative tone.

---
title: {doc.get("title", "")}
url: {doc.get("url", "")}
date: {doc.get("date", "")}
scraped_at: {doc.get("scraped_at", "")}
source: {doc.get("source", "")}

summary:
{doc.get("summary", "")}

content:
{doc.get("content", "")}
"""

def process_articles(hours):
    cutoff_time = datetime.now(tzlocal.get_localzone()) - timedelta(hours=hours)
    count = 0

    for doc in source_collection.find():
        try:
            scraped_at = parser.isoparse(doc.get("scraped_at", ""))
            if scraped_at < cutoff_time:
                continue

            prompt = format_prompt(doc)
            print(f"\n[🔄] Processing: {doc.get('title', 'Untitled')}")
            response = model.generate_content(prompt)
            structured = response.text.strip()
            local_tz = tzlocal.get_localzone()

            structured_doc = {
                "original_id": str(doc["_id"]),
                "title": doc.get("title"),
                "url": doc.get("url"),
                "structured_blog": structured,
                "processed_at": datetime.now(local_tz).isoformat()
            }

            target_collection.insert_one(structured_doc)
            print(f"[✅] Stored structured article: {doc.get('title')}")
            count += 1

        except Exception as e:
            print(f"[❌] Failed to process article: {doc.get('title')} | Error: {e}")

    print(f"\n[🎉] Completed processing {count} articles.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python process_articles.py <hours>")
        sys.exit(1)

    try:
        hours = int(sys.argv[1])
    except ValueError:
        print("Please provide a valid number of hours.")
        sys.exit(1)

    process_articles(hours)
