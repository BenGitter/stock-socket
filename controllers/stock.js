// Dependencies
const request = require("request");

// Load and save API key
require("dotenv").load();
const apiKey = process.env.APIKEY;

exports.getQuoteData = function(quote, callback){
  console.log(`http://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${quote}&apikey=${apiKey}`);
  request(`http://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${quote}&apikey=${apiKey}`, (err, data) => {
    if(JSON.parse(data.body)["Error Message"]){
      return callback(JSON.parse(data.body)["Error Message"], null);
    }else{
      return callback(null, JSON.parse(data.body));
    }
  }); 
}
  