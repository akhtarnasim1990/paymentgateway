var express = require("express");
var router = express.Router();
const { signup, login } = require("../controllers/users");
const auth = require("../middleware/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", signup);
router.post("/login", login);

router.post("/api/checkout", auth, async (req, res) => {
  const { name, address, paymentInfo } = req.body;

  if (!name || !address || !paymentInfo) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newOrder = new Order({
    user: req.user, // Attach user ID
    name,
    address,
    paymentInfo,
  });

  try {
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
