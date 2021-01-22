const express = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.status(200).send("All cool");
// });

const server = app.listen(3000, () => {
  console.log("listening to port 3000...");
});
let io = socket(server);

io.sockets.on("connection", (socket) => {
  console.log("new connection " + socket.id);


 
  socket.on("click", (data) => {
      socket.broadcast.emit("click", data)
    console.log(data);
  
 
  });

 
});
