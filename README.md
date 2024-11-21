# Financial News Scraper

A Node.js-based tool for scraping financial news articles using the SerpAPI and processing them for analysis. This project is designed to extract financial news topics and generate clean, structured CSV outputs for further analysis.

---

## **Features**
- Scrape financial news articles from Google News using the SerpAPI.
- Automatically query articles for specified companies and topics.
- Clean and process the extracted data to remove irrelevant content (e.g., HTML tags, stop words).
- Output structured data in CSV format.

---

## **Prerequisites**
To run this project, ensure you have the following installed:
1. [Node.js](https://nodejs.org/) (v14 or higher)
2. A valid API key for [SerpAPI](https://serpapi.com/)

---

## **Project Structure**

```graphql
financial-news-scraper/
├── src/
│   ├── serpapi-news-search.js     # Script to scrape news articles
│   ├── article-extraction-clean.js # Script to process and clean articles
├── config/
│   └── config.js                  # Stores API key (excluded from Git)
├── data/
│   ├── financial_news_data.csv    # Output from serpapi-news-search.js
│   ├── scraped_financial_articles.csv # Output from article-extraction-clean.js
├── .gitignore                     # Ensures sensitive files and unnecessary directories are not tracked
├── README.md                      # Documentation for the project
├── package.json                   # Project metadata and dependencies
├── package-lock.json              # Dependency lock file

```

---

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/saahas-parise/financial-news-scraper.git
cd financial-news-scraper
```

### Step 2: Install Dependencies

Install the required Node.js packages by running the following command:

```bash
npm install
```

### Step 3: Add Your SerpAPI Key
#### 1. Navigate to the config folder:

```bash
cd config
```

#### 2. Open or create a file named config.js and paste your SerpAPI key in the following format:
```javascript
module.exports = {
    apiKey: "YOUR_API_KEY_HERE"
};
```

### Step 4: Run the Scraping Script
```bash
node src/serpapi-news-search.js
```

This will save the results to ./data/financial_news_data.csv


### Step 5: Process and Clean the Data
To process and clean the scraped articles, run the following script:
```bash
node src/serpapi-news-search.js
```
The processed data will be saved to ./data/scraped_financial_articles.csv.

---
*Made by Saahas Parise*