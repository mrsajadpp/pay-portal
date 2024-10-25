// Database Models Importing
const Article = require("../model/article/model");
const ArticleBin = require("../model/article/bin");
const ArticlePending = require("../model/article/pending");

module.exports = {
    generateSlug: async (str) => {
        // Generate the initial slug
        let slug = str.trim()
            .replace(/[^a-zA-Z0-9]/g, '_')
            .replace(/_+/g, '_');

        // Ensure the slug is lowercase
        slug = slug.toLowerCase();

        // Check if the slug exists in any of the collections
        let isSlugExist = await checkSlugExists(slug);

        // If the slug already exists, append a random lowercase letter until a unique slug is found
        while (isSlugExist) {
            const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Generate a random lowercase letter
            slug += randomLetter;
            isSlugExist = await checkSlugExists(slug);
        }

        return slug;
    }
};

// Function to check if the slug exists in any of the collections
async function checkSlugExists(slug) {
    const articleExists = await Article.exists({ slug });
    const binExists = await ArticleBin.exists({ slug });
    const pendingExists = await ArticlePending.exists({ slug });

    return articleExists || binExists || pendingExists;
}
