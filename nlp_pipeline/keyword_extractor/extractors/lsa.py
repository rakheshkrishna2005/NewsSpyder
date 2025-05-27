from sklearn.decomposition import TruncatedSVD
import numpy as np

def extract_lsa_topics(tfidf_matrix, vectorizer, n_topics=3):
    print("▶️  Extracting LSA topics...")
    svd = TruncatedSVD(n_components=n_topics)
    lsa = svd.fit_transform(tfidf_matrix)
    terms = vectorizer.get_feature_names_out()
    topics = []
    for comp in svd.components_:
        terms_comp = zip(terms, comp)
        sorted_terms = sorted(terms_comp, key=lambda x: x[1], reverse=True)[:10]
        topics.append([t[0] for t in sorted_terms])
    return topics
