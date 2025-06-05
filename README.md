# 📰 News Spyder - AI Powered Cybersecurity News Aggregator

🌐 [**Live Deployed Website**](https://news-spyder.vercel.app/)

## 📚 Table of Contents

- [Key Features](https://github.com/rakheshkrishna2005/NewsSpyder?tab=readme-ov-file#-key-features)
- [Tech Stack](https://github.com/rakheshkrishna2005/NewsSpyder?tab=readme-ov-file#️-tech-stack)
- [Core Modules](https://github.com/rakheshkrishna2005/NewsSpyder?tab=readme-ov-file#-core-modules)
- [System Architecture](https://github.com/rakheshkrishna2005/NewsSpyder?tab=readme-ov-file#️-system-architecture)
- [UI Snapshots](https://github.com/rakheshkrishna2005/NewsSpyder?tab=readme-ov-file#-ui-snapshots)

## 🚀 Key Features

* 📰 **Automated Scraping** — Powered by **Scrapy + BeautifulSoup**, fetching real-time data from *The Hacker News*
* 🧠 **LLM-Powered Structuring** — Clean, concise content via **Google Gemini AI**
* 🏷️ **Smart Keywords** — Extracted using **TF-IDF**, **RAKE**, **TextRank**, and **LSA**
* 🌐 **Modern UI** — Built with **Next.js 14**, **Tailwind CSS**, and **shadcn/ui**

## ⚙️ Tech Stack

| Layer       | Tech                                                   |
| ----------- | ------------------------------------------------------ |
| 🔍 Scraping | `Scrapy`, `BeautifulSoup4`, `MongoDB Atlas`            |
| 🔤 NLP      | `nltk`, `scikit-learn`, `NetworkX`, `TextRank`, `RAKE` |
| 🧠 AI/LLM   | `Google Gemini`                           |
| 📦 Backend  | `MongoDB Atlas`, `Aggregation Pipelines`                 |
| 💻 Frontend | `Next.js`, `TypeScript`, `Tailwind`, `shadcn/ui`       |

## 🧩 Core Modules

### 🕸️ Scraper

* `Scrapy` spider + `BeautifulSoup` cleaning
* Asynchronous crawl pipeline to **MongoDB Atlas**

### 🧠 LLM Processor

* Content is parsed and structured via **Gemini AI**
* Summarization via **Gemini AI** by fetching MongoDB

### 🏷️ Keyword Engine

* NLP stack:

  * `TF-IDF` for relevance
  * `RAKE` for phrase scoring
  * `TextRank` via `NetworkX` for semantic relations

### 🖥️ Frontend

* Fully responsive **Next.js 15** app
* SSR, dynamic routes, fuzzy search, dark mode

## 🏗️ System Architecture

```mermaid
flowchart TD
    %% Combined Data Scraping and Parsing
    A1["News scraped and HTML parsed using Scrapy + BeautifulSoup"] --> A2["Raw data stored in MongoDB Atlas"]

    %% Combined LLM Structuring
    A2 --> A3["LLM (Gemini) Structuring and stored in MongoDB Collection"]

    %% Preprocessing & Analysis
    A3 --> A4["Text Preprocessing"]
    A2 --> A4
    A3 --> A4

    subgraph Analysis[" "]
        direction TB
        A4 --> A5["TF-IDF and N-Grams"]
        A4 --> A6["Text Ranking"]
        A4 --> A7["RAKE Algorithm"]
        A5 --> A6
        A6 --> A7
    end

    %% Keywords Store
    A5 --> A8["Keywords Stored in MongoDB"]
    A6 --> A8
    A7 --> A8

    %% Combined Frontend Stack
    subgraph Frontend[" "]
        direction TB
        B1["MongoDB API + Fetch Articles"] --> B2["Display Articles + Keywords"]
    end

    %% Connections
    A8 --> B1
    B2 --> A8
    A8 --> A4

    %% Class Assignments
    class A1,A2 scraping
    class A3,A4,A5,A6,A7,A8 processing
    class B1 api
    class B2 visualization

    %% Style Definitions
    classDef scraping fill:#bbdefb,stroke:#1e88e5,color:#000,font-weight:bold
    classDef processing fill:#c8e6c9,stroke:#388e3c,color:#000,font-weight:bold
    classDef api fill:#e0b3ff,stroke:#6a1b9a,color:#000,font-weight:bold
    classDef visualization fill:#fff59d,stroke:#fbc02d,color:#000,font-weight:bold

```

## 📸 UI Snapshots

![Home Page](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/1.png)
![Articles List](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/2.png)
![Article Detail](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/3.png)
![Search and Filter](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/4.png)
