import string
import nltk
from nltk import word_tokenize, pos_tag
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("stopwords")
nltk.download("averaged_perceptron_tagger")
nltk.download("averaged_perceptron_tagger_eng")


def clean_text(text):
    return text.lower().translate(str.maketrans("", "", string.punctuation))

def tokenize_and_tag(text):
    tokens = word_tokenize(text)
    return pos_tag(tokens)

def filter_by_pos(pos_tags):
    keep_tags = {"NN", "NNS", "NNP", "NNPS", "JJ", "JJR", "JJS"}
    return [word for word, tag in pos_tags if tag in keep_tags]

def generate_ngrams(tokens, n=2):
    return [" ".join(tokens[i:i+n]) for i in range(len(tokens)-n+1)]

def remove_stopwords(tokens):
    stop_words = set(stopwords.words("english"))
    return [word for word in tokens if word not in stop_words]
