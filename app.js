const express = require("express");
const path = require("path");
const request = require("request");

const app = express();
const port = 3000;

// Load and save API key
require("dotenv").load();
const apiKey = process.env.APIKEY;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
