const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trophySchema = new Schema({
  Name: { type: String },
  Date: { type: String },
});
const Trophy = mongoose.model("Trophy", trophySchema);
module.exports = Trophy;
