const express = require("express");
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// route get /api/orders/my-orders
// desc get logged in user's orders
// access private

router.get("/my-orders", protect, async (req, res) => {
  try {
    // Find orders for the authenticated user and sort by latest
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// route get /api/orders/:id
// desc get order details by id
// acess private

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
