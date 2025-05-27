from pymongo import MongoClient
from pprint import pprint

def main():
    # Connect to local MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    
    db = client["web_scraper"]
    collection = db["scraped_data"]
    
    # Count total documents
    total_docs = collection.count_documents({})
    print(f"Total articles in database: {total_docs}")
    
    # Fetch and display first 5 documents
    print("\n=== First 5 scraped articles ===")
    for doc in collection.find().limit(5):
        content = doc.get("content", "")
        content_length = len(content) if content else 0
        
        pprint({
            "Title": doc.get("title"),
            "URL": doc.get("url"),
            "Date": doc.get("date"),
            "Scraped At": doc.get("scraped_at"),
            "Summary": doc.get("summary")[:200] + "..." if doc.get("summary") else None,
            "Content Length": f"{content_length} characters",
            "Content Snippet": content[:300] + "..." if content else None,
            "Source": doc.get("source"),
        })
        print("\n" + "-"*50 + "\n")
    
    # Show content length statistics
    print("\n=== Content Length Statistics ===")
    pipeline = [
        {
            "$project": {
                "title": 1,
                "content_length": {"$strLenCP": {"$ifNull": ["$content", ""]}},
            }
        },
        {
            "$sort": {"content_length": -1}
        }
    ]
    
    results = list(collection.aggregate(pipeline))
    
    if results:
        print("Top 5 articles by content length:")
        for i, doc in enumerate(results[:5], 1):
            print(f"{i}. {doc.get('title')} - {doc.get('content_length')} characters")
        
        print("\nBottom 5 articles by content length:")
        for i, doc in enumerate(results[-5:], 1):
            print(f"{i}. {doc.get('title')} - {doc.get('content_length')} characters")
        
        # Calculate average content length
        total_length = sum(doc.get('content_length', 0) for doc in results)
        avg_length = total_length / len(results) if results else 0
        print(f"\nAverage content length: {avg_length:.2f} characters")

if __name__ == "__main__":
    main()
