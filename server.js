require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

const mongodb_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/darkroom';

// connecting the database
mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Initializing the app
const app = express();


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;