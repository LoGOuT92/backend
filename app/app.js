const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

require("./db/mongoose");

app.use("/public/uploads", express.static("public/uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/api"));

module.exports = app;
