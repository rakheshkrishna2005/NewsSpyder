# News Spyder - AI-Powered Cybersecurity News Aggregator

News Spyder is an intelligent news aggregation platform that collects, analyzes, and presents cybersecurity news using advanced NLP techniques and AI models.

## Live Deployment
[Live Website - News Spyder](https://news-spyder.vercel.app/)

## Core Features

- **Automated News Scraping**: Scrapes cybersecurity news from The Hacker News
- **AI-Powered Analysis**: Uses Gemini AI for content structuring and summarization
- **Keyword Extraction**: Implements multiple NLP algorithms (TF-IDF, RAKE, TextRank) for keyword extraction
- **Responsive UI**: Modern, responsive interface built with Next.js and Tailwind CSS

## Tech Stack

### Web Scraping
- **Scrapy (2.11.0)**
  - Asynchronous web crawling framework
  - Custom spiders for The Hacker News
  - Pipeline integration with MongoDB
- **BeautifulSoup4 (4.12.2)**
  - HTML parsing and data extraction
  - Clean text processing
  - Tag-based content filtering

### Natural Language Processing
- **NLTK (3.8.1)**
  - Text tokenization and POS tagging
  - Stop word removal
  - Language detection
- **scikit-learn**
  - TF-IDF vectorization
  - LSA (Latent Semantic Analysis)
- **NetworkX**
  - Graph-based TextRank implementation
  - Keyword relationship mapping

### AI and Machine Learning
- **Google Gemini AI**
  - Content structuring and organization
  - Article summarization
  - Entity recognition
- **LangChain**
  - AI model integration
  - Prompt management
  - Chain of thought processing

### Database and Storage
- **MongoDB Atlas**
  - Document-based data storage
  - Full-text search capabilities
  - Real-time data updates
  - Aggregation pipelines

### Frontend Development
- **Next.js 14**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui Components**

## Technical Modules

### 1. Scraping Module
- Scrapy framework for efficient web crawling
- BeautifulSoup4 for HTML parsing
- MongoDB Atlas for raw data storage

### 2. Keyword Extraction Module
- TF-IDF for term importance scoring
- RAKE algorithm for rapid keyword extraction
- TextRank for graph-based keyword analysis

### 3. Web Application Module
- Server-side rendering with Next.js
- RESTful API endpoints for data access
- Responsive UI components with shadcn/ui
- Dark/Light theme support

## Architecture

This is the high-level architecture of News Spyder showing the data flow from scraping to presentation:

![Architecture Diagram](https://github.com/rakheshkrishna2005/NewsSpyder/public/architecture.png)

## Website Screenshots

### Home Page
![Home Page](https://github.com/rakheshkrishna2005/NewsSpyder/public/1.png)

### Articles List
![Articles List](https://github.com/rakheshkrishna2005/NewsSpyder/public/2.png)

### Article Detail
![Article Detail](https://github.com/rakheshkrishna2005/NewsSpyder/public/3.png)

### Search and Filter
![Search and Filter](https://github.com/rakheshkrishna2005/NewsSpyder/public/4.png)