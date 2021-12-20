const Matches = require("../db/models/Matches");

class MatchController {
  async addMatch(req, res) {
    const { HomeTeam, AwayTeam, Date } = req.body;
    const match = new Matches({
      HomeTeam: {
        Name: HomeTeam,
        Logo: "",
        Score: 0,
        Team: [],
      },
      AwayTeam: {
        Name: AwayTeam,
        Logo: "",
        Team: [],
        Score: 0,
      },
      Date: Date,
      comments: [],
    });
    try {
      await match.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(match);
  }
  async getThreeMatches(req, res) {
    const x = await Matches.find();
    const matchesArr = x.slice(-3);
    res.status(200).json({ matchesArr });
  }
  async getMatch(req, res) {
    const { _id } = req.params;
    const match = await Matches.findOne({ _id: _id });
    res.status(200).json({ match });
  }
  async editMatch(req, res) {
    const { _id } = req.params;
    const match = await Matches.findOne({ _id: _id });
    if (req.body.HomeTeam.Color) match.HomeTeam.Color = req.body.HomeTeam.Color;
    if (req.body.HomeTeam.Formation)
      match.HomeTeam.Formation = req.body.HomeTeam.Formation;
    if (req.body.HomeTeam.Team) match.HomeTeam.Team = req.body.HomeTeam.Team;

    if (req.body.AwayTeam.Color) match.AwayTeam.Color = req.body.AwayTeam.Color;
    if (req.body.AwayTeam.Formation)
      match.AwayTeam.Formation = req.body.AwayTeam.Formation;
    if (req.body.HomeTeam.Team) match.AwayTeam.Team = req.body.HomeTeam.Team;

    try {
      await match.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201);
  }
  async addGoal(req, res) {
    const { _id } = req.params;
    const match = await Matches.findOne({ _id: _id });
    if (req.body.team === "HomeTeam") {
      match.HomeTeam.Goal.push({
        Scorer: req.body.score,
        Minutes: req.body.minute,
      });
      match.HomeTeam.Score = match.HomeTeam.Goal.length;
    } else {
      match.AwayTeam.Goal.push({
        Scorer: req.body.score,
        Minutes: req.body.minute,
      });
      match.AwayTeam.Score = match.AwayTeam.Goal.length;
    }
    try {
      await match.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(200).json({ match });
  }
  async subGoal(req, res) {
    const { _id } = req.params;
    const match = await Matches.findOne({ _id: _id });
    if (req.body.team === "HomeTeam") {
      match.HomeTeam.Goal.pop();
      match.HomeTeam.Score = match.HomeTeam.Goal.length;
    } else {
      match.AwayTeam.Goal.pop();
      match.AwayTeam.Score = match.AwayTeam.Goal.length;
    }
    try {
      await match.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(200).json({ match });
  }
}
module.exports = new MatchController();
