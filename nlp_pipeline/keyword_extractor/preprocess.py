from config import NGRAM_RANGE
from utils import clean_text, tokenize_and_tag, filter_by_pos, generate_ngrams, remove_stopwords

def preprocess_text(text):
    print("▶️  Preprocessing text...")
    cleaned = clean_text(text)
    tagged = tokenize_and_tag(cleaned)
    filtered_tokens = filter_by_pos(tagged)
    filtered_tokens = remove_stopwords(filtered_tokens)

    ngrams = []
    for n in range(NGRAM_RANGE[0], NGRAM_RANGE[1]+1):
        ngrams.extend(generate_ngrams(filtered_tokens, n))

    return filtered_tokens, ngrams
