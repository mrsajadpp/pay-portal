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

const notLogged = async (req, res, next) => {
    const { token } = req.query;
    if (!token) return res.redirect("/");
    next();
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

        if (!username) return res.send("Username is required!.");
        if (!password) return res.send("Password is required!.");

        if (username == process.env.USERNAME && password == process.env.PASSWORD) {
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

module.exports = router;