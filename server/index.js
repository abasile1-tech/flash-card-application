const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const dist_folder = __dirname + "/../client/dist/";

app.use(express.static(dist_folder));

// Middleware
app.use(bodyParser.json());
app.use(cors());

const decks = require("./routes/api/decks");

app.use("/api/decks", decks);

const users = require("./routes/api/users");

app.use("/api/users", users);

app.get("/", function (req, res) {
  res.sendFile(dist_folder + "index.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
