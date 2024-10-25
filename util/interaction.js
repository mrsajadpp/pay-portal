// Database Models Importing
const Article = require("../model/article/model");
const ArticleBin = require("../model/article/bin");
const ArticlePending = require("../model/article/pending");
const User = require("../model/user/model");
const UserBin = require("../model/user/bin");
const UserPending = require("../model/user/pending");
const Code = require("../model/otp/model");
const CodeBin = require("../model/otp/bin");
const { default: mongoose } = require('mongoose');

module.exports = {
    updateUserInterests: async (userId, articleId, interactionType) => {
        // Find the user and article by their IDs
        const user = await User.findById(new mongoose.Types.ObjectId(userId));
        const article = await Article.findById(new mongoose.Types.ObjectId(articleId));

        if (!user || !article) {
            throw new Error('User or Article not found');
        }

        // Define weights for different interaction types
        const interactionWeights = {
            click: 1,
            like: 5,
            share: 5,
            comment: 5,
        };

        const weight = interactionWeights[interactionType] || 0;

        // Update the user's interests based on article keywords
        article.keywords.forEach(keyword => {
            if (user.interests.has(keyword)) {
                user.interests.set(keyword, user.interests.get(keyword) + weight);
            } else {
                user.interests.set(keyword, weight);
            }
        });

        // Save the updated user document
        await user.save();
    },
    getRecommendedArticles: async (userId) => {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Get the top N interests (e.g., top 3)
        const topInterests = [...user.interests.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(entry => entry[0]);

        // Find articles that match these interests
        const recommendedArticles = await Article.find({ keywords: { $in: topInterests } });

        return recommendedArticles;
    }
}