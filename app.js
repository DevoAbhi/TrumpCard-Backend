const path = require('path');

// Requiring dependancies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const MONGODB_URI = "mongodb+srv://abhinab:OPlg3nWeW7MILxIA@trumpcard.rnsznsz.mongodb.net/trumpcardsdb"

const app = express();

// Routes imports
const scrapRoute = require('./routes/webScraping');
const cardRoutes = require('./routes/card');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-AUTH-TOKEN");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE,OPTIONS");

    next();
});
app.use(scrapRoute);
app.use(cardRoutes);





mongoose.connect(MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(result => {
    console.log("Database has been connected successfully!")

  })
  .catch(err => {
    console.log("Could not connect to the Database!")
    console.log(err)
  })


module.exports = app;
