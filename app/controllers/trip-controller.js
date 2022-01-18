const Trip = require("../db/models/Trip");
const User = require("../db/models/user");

class TripController {
  async createTrip(req, res) {
    const trip = new Trip({
      HomeTeam: req.body.HomeTeam,
      AwayTeam: req.body.AwayTeam,
      Date: req.body.Date,
      City: req.body.City,
      TripDate: req.body.TripDate,
      ReturnDate: req.body.ReturnDate,
      users: [],
    });
    try {
      await trip.save();
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(trip);
  }
  async getTrip(req, res) {
    const trips = await Trip.find().populate({
      path: "users.user",
      model: User,
    });
    // await posts.populate('user').execPopulate();
    res.status(200).json({ trips });
  }
  async setActive(req, res) {
    const id = req.params._id;
    const trip = await Trip.findOne({ _id: id });
    trip.IsActive = req.body.IsActive;
    try {
      await trip.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json({ trip });
  }

  async deleteTrip(req, res) {
    const id = req.params._id;
    const trip = await Trip.findOneAndDelete({ _id: id });
    try {
      await trip.save();
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
    }
  }
  async addUserToTrip(req, res) {
    const id = req.params._id;
    const trip = await Trip.findOne({ _id: id });
    const user = {
      user: req.body._id,
      Name: req.body._Name,
      Surname: req.body._SurName,
    };
    const found = trip.users.find((x) => x.user == req.body._id);

    if (found) {
      return res.sendStatus(403);
    } else {
      trip.users.push(user);
    }
    try {
      await trip.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(trip);
  }
}

module.exports = new TripController();
