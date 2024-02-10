const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { handlePaymentCallback } = require("../Controllers/paymentControllers");

const router = express.Router();

router.route("/payhere-callback").post(handlePaymentCallback);
//router.route("/newProfile").post(protect, registerUser);

module.exports = router;
