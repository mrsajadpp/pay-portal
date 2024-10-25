const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const router = express.Router();

// Middleware
const verify = async (req, res, next) => {
    const { token } = req.query;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.username != process.env.USERNAME) return res.status(401).json({ error: 'Access denied' });
        if (decoded.password != process.env.PASSWORD) return res.status(401).json({ error: 'Access denied' });
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


module.exports = router;