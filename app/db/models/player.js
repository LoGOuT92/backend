const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  Name: {
    type: String,
    required: [true, "Imie nie moze byc puste"],
  },
  SurName: {
    type: String,
    required: [true, "Nazwisko nie moze byc puste"],
  },
  Number: {
    type: Number,
  },
  Matches: { type: Number },
  Goals: { type: Number },
  Asists: { type: Number },
  Positions: { type: String },
});
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
