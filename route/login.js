const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const router = express.Router();
const mail = require("../email/config");

// Middleware
const notLogged = async (req, res, next) => {
    const { token } = req.session;
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.username != process.env.USER_NAME) return next();
        if (decoded.password != process.env.PASS_WORD) return next();
        return res.redirect('/');
    } catch (error) {
        return next();
    }
}

// Login page
router.get("/login", notLogged, async (req, res, next) => {
    try {
        res.render("login", { title: "Login" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/login", notLogged, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { USER_NAME, PASS_WORD } = process.env;

        if (!username) return res.send("Username is required!.");
        if (!password) return res.send("Password is required!.");

        if (username == USER_NAME && password == PASS_WORD) {
            const token = await jwt.sign(
                {
                    username,
                    password
                },
                secretKey
            );
            req.session.token = token;
            return res.redirect("/");
        } else return res.send("Credentials are not matching!.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Logout
router.get("/logout", async (req, res, next) => {
    try {
        req.session.token = null;
        res.redirect("/auth/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

module.exports = router;