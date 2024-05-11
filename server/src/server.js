import express from "express";

import bodyParser from "body-parser";
import endpoints from './endpoints.js';
import cors from "cors";

const app = express()

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json())

endpoints(app)

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001...')
})
