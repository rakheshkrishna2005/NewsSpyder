# 📰 News Spyder - AI Powered Cybersecurity News Aggregator

🌐 [**Live Deployed Website**](https://news-spyder.vercel.app/)

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

* Fully responsive **Next.js 14** app
* SSR, dynamic routes, fuzzy search, dark mode

## 🏗️ System Architecture

![Architecture Diagram](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/architecture.png)

## 📸 UI Snapshots

![Home Page](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/1.png)
![Articles List](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/2.png)
![Article Detail](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/3.png)
![Search and Filter](https://github.com/rakheshkrishna2005/NewsSpyder/blob/main/public/4.png)
