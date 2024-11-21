const fs = require('fs');
const csvParser = require('csv-parser');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const { extract } = require('@extractus/article-extractor');
const { removeStopwords } = require('stopword');

// Paths for input and output CSVs
const inputCsvPath = './data/financial_news_data.csv';
const outputCsvPath = './data/scraped_financial_articles.csv';

// Initialize the CSV writer
const writer = csvWriter({
    path: outputCsvPath,
    header: [
        { id: 'company', title: 'Company' },
        { id: 'searchTerm', title: 'Search Term' },
        { id: 'url', title: 'URL' },
        { id: 'title', title: 'Title' },
        { id: 'content', title: 'Content' },
        { id: 'author', title: 'Author' },
        { id: 'published', title: 'Published Date' }
    ]
});

// Function to clean content
function cleanContent(content) {
    const noHtml = content.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML
    const noPunctuation = noHtml.replace(/[^\w\s]/gi, ''); // Remove punctuation
    return removeStopwords(noPunctuation.split(' ')).join(' '); // Remove stopwords
}

// Function to process articles
async function processArticles() {
    const records = [];
    fs.createReadStream(inputCsvPath)
        .pipe(csvParser())
        .on('data', row => records.push(row))
        .on('end', async () => {
            const processedRecords = [];
            for (const record of records) {
                try {
                    const articleData = await extract(record.URL);
                    processedRecords.push({
                        company: record.Company,
                        searchTerm: record['Search Term'],
                        url: record.URL,
                        title: articleData.title || '',
                        content: cleanContent(articleData.content || ''),
                        author: articleData.author || 'N/A',
                        published: articleData.published || 'N/A'
                    });
                } catch (error) {
                    console.error(`Error processing article at ${record.URL}:`, error);
                }
            }
            await writer.writeRecords(processedRecords);
            console.log('Processed articles written to CSV.');
        });
}

processArticles();
