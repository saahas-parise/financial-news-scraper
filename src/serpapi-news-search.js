const { getJson } = require('serpapi');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { apiKey } = require('../config/config'); // API key from config.js

// Financial topics to search for
const topics = [
    "Stock Market Trends",
    "Cryptocurrency",
    "Corporate Governance",
    "Financial Scandals",
    "Mergers and Acquisitions",
    "Investment Strategies",
    "Private Equity"
];

// Companies to search for
const companies = [
    "Amazon",
    "Nike",
    "Goldman Sachs",
    "Tesla",
    "Microsoft",
    "JP Morgan",
    "Meta",
    "Apple",
    "Google",
    "Berkshire Hathaway"
];

// CSV output path
const outputCsvPath = './data/financial_news_data.csv';

// Initialize the CSV writer
const csvWriter = createCsvWriter({
    path: outputCsvPath,
    header: [
        { id: 'company', title: 'Company' },
        { id: 'topic', title: 'Search Term' },
        { id: 'title', title: 'Title' },
        { id: 'source', title: 'Source Name' },
        { id: 'author', title: 'Author' },
        { id: 'date', title: 'Date' },
        { id: 'url', title: 'URL' }
    ]
});

// Function to retrieve articles and write them to the CSV
async function retrieve(company, topic) {
    const query = `${company} ${topic}`;
    const params = {
        engine: "google_news",
        q: query,
        api_key: apiKey
    };

    try {
        const json = await getJson(params);
        const articles = json.news_results || [];
        const records = articles.map(article => ({
            company,
            topic,
            title: article.title || '',
            source: article.source || '',
            author: article.authors?.join(', ') || 'N/A',
            date: article.date || 'N/A',
            url: article.link
        }));
        await csvWriter.writeRecords(records);
        console.log(`Data for ${company} - ${topic} written to CSV.`);
    } catch (error) {
        console.error(`Error fetching results for ${query}:`, error);
    }
}

// Iterate through each combination of company and topic
(async () => {
    for (const company of companies) {
        for (const topic of topics) {
            await retrieve(company, topic);
        }
    }
})();
