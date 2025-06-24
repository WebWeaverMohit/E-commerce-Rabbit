const express = require("express");
const Order = require("../Models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// route GET /api/admin/orders
// desc get all orders
// access private/Admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");

    const totalOrders = orders.length;
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      orders,
      totalOrders,
      totalSales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});


// route PUT /api/admin/orders/:id
// desc update order status
// access privateAdmin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name")
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "order not found" });
    }
  } catch (error) {
    console.error("Update error:", error.message, error.stack);

    res.status(500).json({ message: "server error" });
  }
});

// route DELETE /api/admin/orders/:id
// desc delete an order
// access private?Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "order removed" });
    } else {
      res.status(404).json({ message: "order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
