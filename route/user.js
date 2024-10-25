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
    try {
        res.render("index", { title: "Portal Dashboard" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Human Resource page
router.get("/hr", verify, (req, res, next) => {
    try {
        res.render("hr", { title: "HR Portal Dashboard" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/add-employee", verify, (req, res, next) => {
    try {
        res.render("hr/add-employee", { title: "Add New Employee" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/update-employee", verify, (req, res, next) => {
    try {
        res.render("hr/update-employee", { title: "Update Employee" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/employee/:employeeId", verify, (req, res, next) => {
    try {
        res.render("hr/employee", { title: "Employee Details" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Customers page
router.get("/customers", verify, (req, res, next) => {
    try {
        res.render("customers", { title: "Customers Dashboard" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/customers/add-customer", verify, (req, res, next) => {
    try {
        res.render("customers/add-customer", { title: "Add New Customer" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/customers/update-customer", verify, (req, res, next) => {
    try {
        res.render("customers/update-customer", { title: "Update Customer" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/customers/customer/:customerId", verify, (req, res, next) => {
    try {
        res.render("customers/customer", { title: "Customer Details" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Projects page
router.get("/projects", verify, (req, res, next) => {
    try {
        res.render("projects", { title: "Projects Dashboard" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/projects/start", verify, (req, res, next) => {
    try {
        res.render("projects/start", { title: "Start New Project" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/projects/project/:projectId", verify, (req, res, next) => {
    try {
        res.render("projects/project", { title: "Start New Project" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Invoicing page
router.get("/invoicing", verify, (req, res, next) => {
    try {
        res.render("invoicing", { title: "Invoicing" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/invoicing/create-invoice", verify, (req, res, next) => {
    try {
        res.render("invoicing/create-invoice", { title: "Create Invoice" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/invoicing/edit-invoice", verify, (req, res, next) => {
    try {
        res.render("invoicing/edit-invoice", { title: "Edit Invoice" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

module.exports = router;