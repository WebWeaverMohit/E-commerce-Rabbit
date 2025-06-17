const express = require("express");
const router = express.Router();
const Subscriber = require("../Models/Subscriber");

// route POST /api/subscribe
// desc handle news letter subscription
// access Public

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(404).json({ message: "email is required" });
  }

  try {
    // check if the emial is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "email is already subscribed" });
    }

    // create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Succesfully subscribed to new Letter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router