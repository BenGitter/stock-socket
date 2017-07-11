// Dependencies
const express = require("express");
const path = require("path");

// Server
const app = express();
const http = require("http").Server(app);
const port = 3000;

// Load Socket logic
require("./controllers/socket")(http);

// Load Stock logic
const stock = require("./controllers/stock");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// API: get quote data
app.get("/api/quote/:quote", (req, res) => {
  const quote = req.params.quote;

  stock.getQuoteData(quote, (err, data) => {
    if(err){
      res.json({success: false, error: err});
    }else{
      res.json({success: true, data: data})
    }
  });
});

// Load Angular frontend 
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
