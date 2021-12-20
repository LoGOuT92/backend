const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
  HomeTeam: {
    Name: { type: String },
    Score: { type: Number },
    Team: [],
    Logo: { type: String },
    Formation: { type: Array },
    Color: { type: String },
    Goal: [
      {
        Scorer: { type: String },
        Minutes: { type: Number },
      },
    ],
  },
  AwayTeam: {
    Name: { type: String },
    Score: { type: Number },
    Team: [],
    Logo: { type: String },
    Formation: { type: Array },
    Color: { type: String },
    Goal: [
      {
        Scorer: { type: String },
        Minutes: { type: Number },
      },
    ],
  },
  Date: { type: String },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
      parentId2: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      content: {
        type: String,
        min: 2,
      },
      time: { type: String },
      dateTime: { type: String },
      likes: [
        {
          value: { type: Number },
          user: { type: mongoose.Types.ObjectId },
        },
      ],

      repies: [
        {
          user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
          },
          content: {
            type: String,
            min: 2,
          },
          time: { type: String },
          dateTime: { type: String },
          likes: [
            {
              value: { type: Number },
              user: { type: mongoose.Types.ObjectId },
            },
          ],
        },
      ],
    },
  ],
});
const Matches = mongoose.model("Matches", matchesSchema);

module.exports = Matches;
