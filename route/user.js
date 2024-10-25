const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const router = express.Router();

// Middleware
const verify = async (req, res, next) => {
    const { token } = req.session;
    const { USER_NAME, PASS_WORD } = process.env;
    if (!token) return res.redirect("/auth/login");
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.username != USER_NAME) return res.redirect("/auth/login");
        if (decoded.password != PASS_WORD) return res.redirect("/auth/login");
        next();
    } catch (error) {
        return res.redirect("/auth/login");
    }
}

// Home page
router.get("/", verify, (req, res, next) => {
    res.send("hi")
});

module.exports = router;