const stock = require("./stock");

module.exports = function(http){
  const io = require("socket.io")(http); 

  io.on("connection", (socket) => {
    console.log("A new user connected");

    // Emit current quotes array to new user
    const quotes = stock.getQuotes();
    quotes.forEach((quote, i) => {
      socket.emit("new quote", quote);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("new quote", (quote) => {
      stock.addQuote(quote, (err, isAdded) => {
        if(err){
          socket.emit("notification", "Quote doesn't exist");
        }else if(isAdded){
          io.emit("new quote", quote.toUpperCase());
        }else{
          socket.emit("notification", "Quote already displayed");
        }

        console.log(stock.getQuotes());
      })
    });
  });
};