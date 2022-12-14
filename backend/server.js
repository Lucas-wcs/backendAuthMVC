const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
const cors = require('cors');
const connection = require('./config/db');
const usersRoute = require("./routes/users.route");


const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type', "authorization"],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRoute)

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})