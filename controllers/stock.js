// Dependencies
const request = require("request");

// Load and save API key
require("dotenv").load();
const apiKey = process.env.APIKEY;

// Array with quotes
let quotes = [];

exports.getQuoteData = function(quote, callback){
  request(`http://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${quote}&apikey=${apiKey}`, (err, data) => {
    if(JSON.parse(data.body)["Error Message"]){
      return callback(JSON.parse(data.body)["Error Message"], null);
    }else{
      return callback(null, JSON.parse(data.body));
    }
  }); 
}

exports.addQuote = function(quote, callback){
  const _quote = quote.toLowerCase();
  if(quotes.indexOf(_quote) >= 0){
    return callback(null, "Quote already displayed");
  }else{
    getQuoteData(_quote, (err, data) => {
      if(err){
        return callback("Quote doesn't exist", null);
      }else{
        quotes.push(_quote);
        return callback(null, "Quote added");
      }
    });
  }
}
  