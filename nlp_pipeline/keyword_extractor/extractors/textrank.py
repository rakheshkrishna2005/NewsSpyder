import networkx as nx
from itertools import combinations

def extract_textrank(tokens, window_size=4):
    print("▶️  Running TextRank...")
    graph = nx.Graph()
    for i in range(len(tokens)):
        for j in range(i+1, min(i+window_size, len(tokens))):
            graph.add_edge(tokens[i], tokens[j])
    scores = nx.pagerank(graph)
    return scores
