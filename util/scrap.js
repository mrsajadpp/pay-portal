const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios'); // for downloading images
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Utility function to generate a slug for the image name
function generateSlug(name) {
    return name.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
}

module.exports = {
    // Function to save images from HTML content
    saveImagesFromHtml: async (htmlString, saveDirectory) => {
        // Load the HTML string into Cheerio
        const $ = cheerio.load(htmlString);

        // Iterate over all <img> tags
        $('img').each(async (index, element) => {
            let imgSrc = $(element).attr('src');
            if (imgSrc) {
                // Extract the image name from the src
                let imageName = path.basename(imgSrc);
                let imageSlug = generateSlug(path.parse(imageName).name);
                let imageExtension = path.extname(imageName);

                // Define the full path where the image will be saved
                let imageSavePath = path.join(saveDirectory, `${imageSlug}${imageExtension}`);
                let imageCounter = 1;

                // Check if the image already exists and rename it if necessary
                while (fs.existsSync(imageSavePath)) {
                    imageSlug = `${imageSlug}_${imageCounter++}`;
                    imageSavePath = path.join(saveDirectory, `${imageSlug}${imageExtension}`);
                }

                // Save the image to the file system (assuming the images are accessible via the imgSrc URL)
                const imageBuffer = await fetchImageBuffer(imgSrc);
                fs.writeFileSync(imageSavePath, imageBuffer);

                // Update the img src in the HTML
                $(element).attr('src', `/api/v1/img/${imageSlug}${imageExtension}`);
            }
        });

        // Return the updated HTML as a string
        return $.html();
    },
    extractKeywordsUsingTFIDF: (articleContent, allArticles) => {
        // Add documents (articles) to tf-idf
        allArticles.forEach(content => tfidf.addDocument(content));

        // Get keywords for the specific article
        tfidf.addDocument(articleContent);
        const keywords = [];
        tfidf.listTerms(allArticles.length).forEach(item => {
            keywords.push(item.term);
        });

        return keywords.slice(0, 10);  // Return top 10 keywords
    }
};

// Function to fetch image buffer from a URL (using axios for HTTP requests)
async function fetchImageBuffer(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
}