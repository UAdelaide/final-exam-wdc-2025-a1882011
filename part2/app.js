const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
//session
const session = require('express-session');
app.use(session({
  secret: 'scretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
//add dogroutes
const dogRoutes = require('./routes/dogRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
//add dogroutes
app.use('/api/dogs', dogRoutes);

// Export the app instead of listening here
module.exports = app;