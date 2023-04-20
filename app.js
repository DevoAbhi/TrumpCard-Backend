import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Requiring dependancies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const MONGODB_URI = "mongodb+srv://abhinab:OPlg3nWeW7MILxIA@trumpcard.rnsznsz.mongodb.net/trumpcardsdb"

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Routes imports
import scrapRoutes from './routes/webScraping.js';
import cardRoutes from './routes/card.js';
import authRoutes from './routes/auth.js';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-AUTH-TOKEN");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE,OPTIONS");

    next();
});
app.use(scrapRoutes);
app.use(cardRoutes);
app.use('/user', authRoutes);





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


  export default app;
