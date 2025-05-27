from pymongo import MongoClient
from preprocess import preprocess_text
from extractors import tfidf, textrank, rake
from config import TFIDF_WEIGHT, TEXTRANK_WEIGHT, RAKE_WEIGHT
import re
import os
import sys
from dotenv import load_dotenv
from dateutil import parser
from datetime import datetime, timedelta
import tzlocal

load_dotenv()

def is_valid_keyword(term):
    if len(term) > 60:
        return False
    if len(term.split()) > 4:
        return False
    if not re.match(r'^[a-zA-Z0-9\s\-]+$', term):
        return False
    return True

def main(hours):
    mongo_uri = os.environ.get("MONGO_URI")
    client = MongoClient(mongo_uri)
    db = client["web_scraper"]
    collection = db["structured_articles"]

    # Calculate time threshold
    local_tz = tzlocal.get_localzone()
    cutoff_time = datetime.now(local_tz) - timedelta(hours=hours)

    # Fetch documents processed within the last `hours` hours
    docs = list(collection.find())

    for doc in docs:
        try:
            processed_at = parser.isoparse(doc.get("processed_at", ""))
            if processed_at < cutoff_time:
                continue

            text = doc["structured_blog"]

            tokens, ngrams = preprocess_text(text)
            ngram_text = " ".join(ngrams)

            # Extract keyword scores
            vectorizer, tfidf_vector = tfidf.extract_tfidf_scores([ngram_text])
            tfidf_scores = dict(zip(vectorizer.get_feature_names_out(), tfidf_vector.toarray()[0]))
            textrank_scores = textrank.extract_textrank(ngrams)
            rake_scores = rake.extract_rake_phrases(text)

            # Combine scores
            keywords = {}
            all_terms = set(tfidf_scores) | set(textrank_scores) | set(rake_scores)

            for term in all_terms:
                if not is_valid_keyword(term):
                    continue
                score = (
                    TFIDF_WEIGHT * tfidf_scores.get(term, 0) +
                    TEXTRANK_WEIGHT * textrank_scores.get(term, 0) +
                    RAKE_WEIGHT * rake_scores.get(term, 0)
                )
                if score > 0:
                    keywords[term] = round(score, 4)

            top_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:10]

            # Update MongoDB document
            collection.update_one(
                {"_id": doc["_id"]},
                {"$set": {"keywords": [k for k, _ in top_keywords]}}
            )
            print(f"[✅] Updated keywords for: {doc.get('title')}")

        except Exception as e:
            print(f"[❌] Failed to process article: {doc.get('title')} | Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python run_pipeline.py <hours>")
        sys.exit(1)

    try:
        hours = int(sys.argv[1])
    except ValueError:
        print("Please provide a valid number of hours.")
        sys.exit(1)

    main(hours)
