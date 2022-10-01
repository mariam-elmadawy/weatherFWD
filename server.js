// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

const port = 4000;
const hostname = "127.0.0.1";
/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
    console.log(`Server running on localhost: ${port} and ${hostname}`);
}

// GET route
app.get("/all", sendData);
//sendData function
function sendData(req, res) {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

// POST route
app.post("/add", addData);
//callback function
function addData(req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    };
    console.log(projectData);
    res.status(200).send(projectData);
}