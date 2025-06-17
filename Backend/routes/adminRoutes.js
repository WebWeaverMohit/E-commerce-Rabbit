const express = require("express");
const User = require("../Models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// route GET /api/admin/users
// get all users (admin only)
// access private/admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// route POST /api/admin/users
// add a new user
// acess private/Admin

router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user already exist" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();
    res.status(201).json({ messsage: "user created successfully" });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ message: error.message });
  }
});

// route PUT /api/admin/users/:id
// desc update user info.. - name, email, role
// access private/admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updatedUser = await user.save();
    res.json({ message: "user updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

// route DELETE /api/admin/users/:id
// desc DELETE a user
// access private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "user deleted successfully" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
