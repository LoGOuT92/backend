const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  HomeTeam: {
    type: String,
    required: true,
    minlength: 5,
  },
  AwayTeam: {
    type: String,
    required: true,
    minlength: 5,
  },
  Date: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 11,
  },
  TripDate: {
    type: String,
    minlength: 9,
    maxlength: 11,
  },
  ReturnDate: {
    type: String,
    minlength: 9,
    maxlength: 11,
  },
  IsActive: {
    type: Boolean,
    default: true,
  },
  City: { type: String },
  users: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
      Name: { type: String },
      Surname: { type: String },
    },
  ],
});
const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
