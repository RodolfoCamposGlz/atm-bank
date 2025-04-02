const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connect = require("./database/connect");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.listen(8000, () => {
  console.log("server listening on port 8000");

  // connect to the database
  connect();
});
