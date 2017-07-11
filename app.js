// Dependencies
const express = require("express");
const path = require("path");
const request = require("request");

// Server
const app = express();
const http = require("http").Server(app);
const port = 3000;

// Load Socket logic
require("./socket")(http);


// Load and save API key
require("dotenv").load();
const apiKey = process.env.APIKEY;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// API: get quote data
app.get("/api/quote/:id", (req, res) => {
  const id = req.params.id;

  request(`http://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${id}&apikey=${apiKey}`, (err, data) => {
    if(JSON.parse(data.body)["Error Message"]){
      res.json({success: false, error: JSON.parse(data.body)["Error Message"]});
    }else{
      res.json({success: true, data: JSON.parse(data.body)})
    }
  })
});

// Load Angular frontend 
app.get("*", (req, res, next) => {
  if(req.url.indexOf("socket") !== -1) return next();
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
