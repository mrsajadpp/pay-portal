const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const router = express.Router();

// Database Model
const Employee = require("../data/model/employee/model");
const EmployeeBin = require("../data/model/employee/bin");

const Customer = require("../data/model/customer/model");

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
router.get("/hr", verify, async (req, res, next) => {
    try {
        let employees = await Employee.find().sort({ _id: -1 }).lean();

        res.render("hr", { title: "HR Portal Dashboard", employees });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/add-employee", verify, async (req, res, next) => {
    try {
        res.render("hr/add-employee", { title: "Add New Employee" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/hr/add-employee", verify, async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, country, state, city, pinCode, experience, position, department, employeeId } = req.body;

        if (!firstName) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "FirstName is required" });
        if (!lastName) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "LastName is required" });
        if (!email) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Email is required" });
        if (!phone) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Phone is required" });
        if (!country) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Country is required" });
        if (!state) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "State is required" });
        if (!city) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "City is required" });
        if (!pinCode) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Pin Code is required" });
        if (!experience) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Experience is required" });
        if (!position) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Position is required" });
        if (!department) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Department is required" });
        if (!employeeId) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Employee Id is required" });

        req.body.address = { country, state, city, pinCode };
        let employee = new Employee(req.body);
        await employee.save();

        return res.redirect("/hr");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/update-employee/:employeeId", verify, async (req, res, next) => {
    try {
        if (!req.params.employeeId) return res.send("Employee Id is required");
        let employee = await Employee.findOne({ employeeId: req.params.employeeId }).lean();
        res.render("hr/update-employee", { title: "Update Employee", employee });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/del-employee/:employeeId", verify, async (req, res, next) => {
    try {
        if (!req.params.employeeId) return res.send("Employee Id is required");
        let employee = await Employee.findOne({ employeeId: req.params.employeeId }).lean();
        let newEmp = new EmployeeBin(employee);
        await newEmp.save();
        await Employee.deleteOne({ employeeId: employee.employeeId });
        res.redirect("/hr");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/hr/update-employee", verify, async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, country, state, city, pinCode, experience, position, department, employeeId } = req.body;

        if (!firstName) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "FirstName is required" });
        if (!lastName) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "LastName is required" });
        if (!email) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Email is required" });
        if (!phone) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Phone is required" });
        if (!country) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Country is required" });
        if (!state) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "State is required" });
        if (!city) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "City is required" });
        if (!pinCode) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Pin Code is required" });
        if (!experience) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Experience is required" });
        if (!position) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Position is required" });
        if (!department) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Department is required" });
        if (!employeeId) return res.render("hr/add-employee", { title: "Add New Employee", employee: req.body, error: "Employee Id is required" });

        req.body.address = { country, state, city, pinCode };
        let employee = await Employee.updateOne({ employeeId: employeeId }, req.body);
        return res.redirect("/hr");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/hr/employee/:employeeId", verify, async (req, res, next) => {
    try {
        if (!req.params.employeeId) return res.send("Employee Id is required");
        let employee = await Employee.findOne({ employeeId: req.params.employeeId }).lean();

        res.render("hr/employee", { title: "Employee Details", employee });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/hr/search", verify, async (req, res, next) => {
    try {
        const { query } = req.body;

        let employees = await Employee.find().sort({ _id: -1 }).lean();
        if (!query) return res.render("hr", { title: "HR Management", employees });

        const regex = new RegExp(query, 'i');

        // Filter employees based on the query
        let filtered = await Employee.find({
            $or: [
                { firstName: { $regex: regex } },
                { lastName: { $regex: regex } },
                { email: { $regex: regex } },
                { position: { $regex: regex } },
                { department: { $regex: regex } },
                { employeeId: { $regex: regex } },
            ],
        }).sort({ _id: -1 }).lean();


        return res.render("hr", { title: "HR Portal Dashboard", employees: filtered, query });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Customers page
router.get("/customers", verify, async (req, res, next) => {
    try {
        let customers = await Customer.find().sort({ _id: -1 }).lean();
        res.render("customers", { title: "Customers Dashboard", customers });
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

router.post("/customers/add-customer", verify, async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, country, state, city, pinCode, customerId } = req.body;

        if (!firstName) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "FirstName is required" });
        if (!lastName) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "LastName is required" });
        if (!email) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Email is required" });
        if (!phone) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Phone is required" });
        if (!country) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Country is required" });
        if (!state) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "State is required" });
        if (!city) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "City is required" });
        if (!pinCode) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Pin Code is required" });
        if (!customerId) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Employee Id is required" });

        req.body.address = { country, state, city, pinCode };
        let customer = new Customer(req.body);
        await customer.save();

        return res.redirect("/customers");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/customers/update-customer/:customerId", verify, async (req, res, next) => {
    try {
        if (!req.params.customerId) return res.send("Customer Id is required");
        let customer = await Customer.findOne({ customerId: req.params.customerId }).lean();
        res.render("customers/update-customer", { title: "Update Customer", customer });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/customers/customer/:customerId", verify, async (req, res, next) => {
    try {
        if (!req.params.customerId) return res.send("Customer Id is required");
        let customer = await Customer.findOne({ customerId: req.params.customerId }).lean();
        res.render("customers/customer", { title: "Customer Details", customer });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/customers/update-customer", verify, async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, country, state, city, pinCode, customerId } = req.body;

        if (!firstName) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "FirstName is required" });
        if (!lastName) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "LastName is required" });
        if (!email) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Email is required" });
        if (!phone) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Phone is required" });
        if (!country) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Country is required" });
        if (!state) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "State is required" });
        if (!city) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "City is required" });
        if (!pinCode) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Pin Code is required" });
        if (!customerId) return res.render("customers/add-customer", { title: "Add New Customer", customer: req.body, error: "Employee Id is required" });

        req.body.address = { country, state, city, pinCode };
        let customer = await Customer.updateOne({ customerId: customerId }, req.body);

        return res.redirect("/customers");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/customers/search", verify, async (req, res, next) => {
    try {
        const { query } = req.body;

        let customers = await Customer.find().sort({ _id: -1 }).lean();
        if (!query) return res.render("customers", { title: "Customer Management", customers });

        const regex = new RegExp(query, 'i');

        // Filter employees based on the query
        let filtered = await Customer.find({
            $or: [
                { firstName: { $regex: regex } },
                { lastName: { $regex: regex } },
                { email: { $regex: regex } },
                { customerId: { $regex: regex } },
            ],
        }).sort({ _id: -1 }).lean();


        return res.render("customers", { title: "Customer Management", customers: filtered, query });
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

// Payments page
router.get("/payments", verify, (req, res, next) => {
    try {
        res.render("payments", { title: "Payments Management" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/payments/create-payment", verify, (req, res, next) => {
    try {
        res.render("payments/create-payment", { title: "Create Payment" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/payments/update-payment/:paymentId", verify, (req, res, next) => {
    try {
        res.render("payments/update-payment", { title: "Update Payment" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

module.exports = router;