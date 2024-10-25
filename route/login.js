const express = require('express');
const router = express.Router();

// Login page
router.get("/login", async (req, res, next) => {
    try {
        res.render("login", { title: "Login" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
})

module.exports = router;