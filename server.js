const express = require("express");
const socket = require("socket.io");
const Datastore = require("nedb");
const app = express();

app.use(express.static("public"));

app.get("/api", (req, res) => {
  let startState;
  db.find({}, function (err, docs) {
    startState = docs[0].isOn;
    res.status(200).send(startState);
  });
});

const db = new Datastore({ filename: "database.db", autoload: true });
db.loadDatabase();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("listening to port 3000...");
});
let io = socket(server);

io.sockets.on("connection", (socket) => {
  console.log("new connection " + socket.id);

  socket.on("click", (data) => {
    db.update(
      {},
      { $set: { isOn: data.isOn } },
      { multi: false },
      function (err, numReplaced) {
        numReplaced = 0;
      }
    );
    //for repair
    // db.insert(data)
    //{"isOn":true,"_id":"ZXggbluAKPop9CIu"}

    socket.broadcast.emit("click", data);
    console.log(data);
  });
});
