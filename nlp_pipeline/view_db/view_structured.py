from pymongo import MongoClient

def view_structured_articles(limit=5):
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017")
    db = client["web_scraper"]
    collection = db["structured_articles"]

    # Query documents
    articles = collection.find().limit(limit)

    # Display results
    print(f"\n=== First {limit} Structured Blog Articles ===\n")
    for article in articles:
        print(f"Title       : {article.get('title')}")
        print(f"URL         : {article.get('url')}")
        print(f"Processed At: {article.get('processed_at')}")
        print(f"Keywords    : {', '.join(article.get('keywords', []))}")
        print(f"\nStructured Blog Content:\n{'-'*40}\n{article.get('structured_blog')[:1000]}...")
        print("\n" + "="*80 + "\n")

if __name__ == "__main__":
    view_structured_articles()
