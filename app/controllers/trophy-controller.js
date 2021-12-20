const Trophy = require("../db/models/Trophy");

class TrophyController {
  async createTrophy(req, res) {
    const trophy = new Trophy({
      Name: req.body.Name,
      Date: req.body.Date,
    });
    try {
      await trophy.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(trophy);
  }
  async getTrophies(req, res) {
    const trophies = await Trophy.find();
    res.status(200).json({ trophies });
  }
}

module.exports = new TrophyController();
