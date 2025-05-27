from sklearn.feature_extraction.text import TfidfVectorizer

def extract_tfidf_scores(corpus, ngram_range=(1, 3)):
    print("▶️  Computing TF-IDF scores...")
    vectorizer = TfidfVectorizer(ngram_range=ngram_range)
    X = vectorizer.fit_transform(corpus)
    return vectorizer, X
