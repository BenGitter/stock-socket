module.exports = function(http){
  const io = require("socket.io")(http); 

  io.on("connection", (socket) => {
    console.log("A new user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("new quote", (quote) => {
      io.emit("new quote", quote);
    });
  });
};