from collections import Counter
from utils import remove_stopwords

def extract_rake_phrases(text):
    print("▶️  Extracting RAKE phrases...")
    words = text.split()
    words = remove_stopwords(words)
    phrases = []
    phrase = []
    for word in words:
        if word:
            phrase.append(word)
        else:
            if phrase:
                phrases.append(" ".join(phrase))
                phrase = []
    if phrase:
        phrases.append(" ".join(phrase))
    return Counter(phrases)
