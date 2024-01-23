// Libraries
const express = require('express');
const mongoose = require('mongoose');

// Routers
const contacts = require(__dirname + '/routes/contacts');
const users = require(__dirname + '/routes/users');

// Database Connection
mongoose.connect('mongodb://localhost:27017/contacts_subdocuments');

// Express Server
let app = express();

// Middleware for POST and PUT requests
// Routers for each group of routes
app.use(express.json());
app.use('/contacts', contacts);
app.use('/users', users);

// Server Startup
app.listen(8080);
