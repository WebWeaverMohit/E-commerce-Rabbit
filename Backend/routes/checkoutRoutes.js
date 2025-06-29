const express = require("express");
const Checkout = require("../Models/CheckOut");
const Product = require("../Models/Product");
const Cart = require("../Models//Cart");
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ROUTE POST  /api/checkout
// desc crate a new session
// access private

router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "no items in checkout" });
  }

  try {
    // create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("error creating check out session", error);
    res.status(500).json({ message: "server error" });
  }
});

// route put /api/checkout/:id/pay
// desc update checkout to mark as paid after successful payemnt
// access private

router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "checkout not found" });
    }

    if (paymentStatus === "paid") {  
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      return res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "invalid payment status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});


// route post /api/checkout/:id/finalize
// desc finalize checkout and convert to an order after payment confirmation
// access private

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // create the final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
      // mark the checkout is finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // delete the cart associated with user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "checkoout already finalized" });
    } else {
      res.status(400).json({ message: "checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;