const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const router = express.Router();
const mail = require("../email/config");

// Database Model
const Employee = require("../data/model/employee/model");
const EmployeeBin = require("../data/model/employee/bin");

const Customer = require("../data/model/customer/model");

const Project = require("../data/model/project/model");
const ProjectBin = require("../data/model/project/bin");

const Invoice = require("../data/model/invoice/model");
const InvoiceBin = require("../data/model/invoice/bin");

const Payment = require("../data/model/payment/model");

const { default: mongoose } = require('mongoose');

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
        req.body.firstName = firstName.toUpperCase();
        req.body.lastName = lastName.toUpperCase();
        let employee = new Employee(req.body);
        await employee.save();

        mail.newEmployee(`${firstName} ${lastName}`, email);

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

        mail.dataUpdated(`${firstName} ${lastName}`, email);
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

        mail.newCustomer(`${firstName} ${lastName}`, email);
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

        mail.dataUpdated(`${firstName} ${lastName}`, email);
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
router.get("/projects", verify, async (req, res, next) => {
    try {
        let projects = await Project.find().sort({ _id: -1 }).lean();
        res.render("projects", { title: "Projects Dashboard", projects });
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

router.post("/projects/start-project", verify, async (req, res, next) => {
    try {
        const { projectName, projectDescription, projectRequirements, customerId, projectAmount, maxDuration } = req.body;

        if (!projectName) return res.render("projects/start", { title: "Start New Project", project: req.body, error: "ProjectName is required" });
        if (!projectDescription) return res.render("projects/start", { title: "Start New Project", project: req.body, error: "projectDescription is required" });
        if (!projectRequirements) return res.render("projects/start", { title: "Start New Project", project: req.body, error: "projectRequirements is required" });
        if (!projectAmount) return res.render("projects/start", { title: "Start New Project", project: req.body, error: "projectAmount is required" });
        if (!maxDuration) return res.render("projects/start", { title: "Start New Project", project: req.body, error: "maxDuration is required" });
        if (!customerId) return res.render("projects/start", { title: "Start New Project", project: req.body, error: "customerId Id is required" });

        let project = new Project(req.body);
        await project.save();

        let customer = await Customer.findOne({ customerId: customerId }).lean();
        mail.projectStarted(`${customer.firstName} ${customer.lastName}`, customer.email, projectName, projectAmount, projectRequirements, projectDescription);
        mail.notifyProjectManager("sadiq@grovixlab.com", projectName, `${customer.firstName} ${customer.lastName}`, projectAmount, projectRequirements, projectDescription);
        return res.redirect("/projects");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/projects/project/:projectId", verify, async (req, res, next) => {
    try {
        if (!req.params.projectId) return res.send("Project Id is required");
        let project = await Project.findOne({ _id: new mongoose.Types.ObjectId(req.params.projectId) }).lean();
        res.render("projects/project", { title: "Start New Project", project });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/projects/search", verify, async (req, res, next) => {
    try {
        const { query } = req.body;

        let projects = await Project.find().sort({ _id: -1 }).lean();
        if (!query) return res.render("projects", { title: "Projects Management", projects });

        const regex = new RegExp(query, 'i');

        // Filter employees based on the query
        let filtered = await Project.find({
            $or: [
                { projectAmount: { $regex: regex } },
                { projectDescription: { $regex: regex } },
                { projectRequirements: { $regex: regex } },
            ],
        }).sort({ _id: -1 }).lean();


        return res.render("projects", { title: "Project Management", projects: filtered, query });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Invoicing page
router.get("/invoicing", verify, async (req, res, next) => {
    try {
        let invoices = await Invoice.find().sort({ _id: -1 }).lean();
        res.render("invoicing", { title: "Invoicing", invoices });
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

router.post("/invoicing/create-invoice", verify, async (req, res, next) => {
    try {
        const { projectId, customerId, notes, dueDate } = req.body;

        if (!projectId) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "projectId is required" });
        if (!customerId) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "customerId Id is required" });
        if (!notes) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "notes Id is required" });
        if (!dueDate) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "dueDate Id is required" });

        let project = await Project.findOne({ _id: new mongoose.Types.ObjectId(projectId) }).lean();

        if (!project) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "projectId is not exist" });

        req.body.invoiceDate = new Date();
        req.body.amount = project.projectAmount;
        let invoice = new Invoice(req.body);
        await invoice.save();

        let customer = await Customer.findOne({ customerId: customerId }).lean();

        const dueDateVal = new Date(dueDate).toISOString().split('T')[0];

        mail.sendInvoiceEmail(`${customer.firstName} ${customer.lastName}`, customer.email, project.projectName, project.projectAmount, dueDateVal, "https://rzp.io/rzp/D3uYpTh")

        return res.redirect("/invoicing");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.get("/invoicing/edit-invoice/:invoiceId", verify, async (req, res, next) => {
    try {
        if (!req.params.invoiceId) return res.send("Invoice Id is required");
        let invoice = await Invoice.findOne({ _id: new mongoose.Types.ObjectId(req.params.invoiceId) }).lean();
        const dueDate = new Date(invoice.dueDate).toISOString().split('T')[0];

        res.render("invoicing/edit-invoice", { title: "Edit Invoice", invoice, dueDate });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/invoicing/update-invoice", verify, async (req, res, next) => {
    try {
        const { projectId, customerId, notes, dueDate } = req.body;

        if (!projectId) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "projectId is required" });
        if (!customerId) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "customerId Id is required" });
        if (!notes) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "notes Id is required" });
        if (!dueDate) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "dueDate Id is required" });

        let project = await Project.findOne({ _id: new mongoose.Types.ObjectId(projectId) }).lean();

        if (!project) return res.render("invoicing/create-invoice", { title: "Create Invoice", invoice: req.body, error: "projectId is not exist" });
        req.body.invoiceDate = new Date();
        req.body.amount = project.projectAmount;
        let invoice = await Invoice.updateOne({ projectId: projectId }, req.body);

        return res.redirect("/invoicing");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

router.post("/invoicing/search", verify, async (req, res, next) => {
    try {
        const { query } = req.body;

        let invoices = await Invoice.find().sort({ _id: -1 }).lean();
        if (!query) return res.render("invoicing", { title: "Invoicing", invoices });

        const regex = new RegExp(query, 'i');

        // Filter employees based on the query
        let filtered = await Invoice.find({
            $or: [
                { customerId: { $regex: regex } },
                { amount: { $regex: regex } },
            ],
        }).sort({ _id: -1 }).lean();
        res.render("invoicing", { title: "Invoicing", invoices: filtered, query });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server issue(500)!");
    }
});

// Payments page
router.get("/payments", verify, async (req, res, next) => {
    try {
        let payments = await Payment.find().sort({ _id: -1 }).lean();
        res.render("payments", { title: "Payments Management", payments });
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

router.post("/payments/create-payment", verify, async (req, res, next) => {
    try {
        const { invoiceId, paymentMethod } = req.body;

        if (!invoiceId) return res.render("payments/create-payment", { title: "Create Invoice", invoice: req.body, error: "invoiceId is required" });
        if (!paymentMethod) return res.render("payments/create-payment", { title: "Create Invoice", invoice: req.body, error: "payment Method is required" });

        let invoice = await Invoice.findOne({ _id: new mongoose.Types.ObjectId(invoiceId) }).lean();

        if (!invoice) return res.render("payments/create-payment", { title: "Create Invoice", invoice: req.body, error: "invoice is not exist" });

        let project = await Project.findOne({ _id: new mongoose.Types.ObjectId(invoice.projectId) }).lean();

        if (!project) return res.render("payments/create-payment", { title: "Create Invoice", invoice: req.body, error: "projectId is not exist" });

        req.body.paymentDate = new Date();
        req.body.amount = project.projectAmount;
        req.body.customerId = invoice.customerId;

        let payment = new Payment(req.body);
        await payment.save();

        let projectDel = new ProjectBin(project);
        await projectDel.save();

        await Project.deleteOne({ _id: new mongoose.Types.ObjectId(invoice.projectId) });

        let invoiceDel = new InvoiceBin(invoice);
        await invoiceDel.save();

        await Invoice.deleteOne({ _id: new mongoose.Types.ObjectId(invoice._id) });

        return res.redirect("/payments");
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