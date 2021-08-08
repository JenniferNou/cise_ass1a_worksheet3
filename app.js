// app.js

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");

var cors = require('cors');

// routes
const books = require('./routes/api/books');
const { Mongoose } = require('mongoose');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./my-app/build")));

// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./my-app/public", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));