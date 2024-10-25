require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const colors = require('colors');
const UAParser = require('ua-parser-js');
const app = express();
const PORT = 3000;
 
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
); 


// Define a custom token for coloring status code
morgan.token('status', (req, res) => {
    const status = res.statusCode;
    let color = status >= 500 ? 'red'    // server error
        : status >= 400 ? 'yellow' // client error
            : status >= 300 ? 'cyan'   // redirection
                : status >= 200 ? 'green'  // success
                    : 'reset';                 // default

    return colors[color](status);
});

// Define the custom morgan format
app.use(
    morgan((tokens, req, res) => {
        return [
            colors.blue(tokens.method(req, res)),
            colors.magenta(tokens.url(req, res)),
            tokens.status(req, res),
            colors.cyan(tokens['response-time'](req, res) + ' ms'),
        ].join(' ');
    })
);

app.use(morgan("combined", { stream: accessLogStream }));

// Middleware to parse User-Agent
app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    req.device = device;
    next();
});
app.use(express.json());

app.use('/api/user/', require('./route/user'));

app.listen(PORT, () => {
    console.log(`🚀 Listening at http://127.0.0.1:${PORT}/`);
});