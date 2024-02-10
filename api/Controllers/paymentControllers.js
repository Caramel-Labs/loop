const axios = require("axios");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const { PaymentModel } = require("../Models/paymentModel");

const merchantId = process.env.MERCHANT_ID;
const merchantSecret = process.env.MERCHANT_SECRET;

// Handle the payment callback from PayHere
const handlePaymentCallback = asyncHandler(async (req, res) => {
  try {
    // Get the POST data from PayHere
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      custom_1,
      custom_2,
      method,
      status_message,
      // ... other relevant data
    } = req.body;

    // Verify the payment by comparing the received md5sig with your calculated hash
    const calculatedMd5Sig = crypto
      .createHash("md5")
      .update(
        `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${merchantSecret}`
      )
      .digest("hex")
      .toUpperCase();

    if (md5sig !== calculatedMd5Sig) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Payment is verified, update your database or perform other actions
    // For example, store payment details in your database
    const payment = new PaymentModel({
      merchant_id,
      order_id,
      amount: payhere_amount,
      currency: payhere_currency,
      status_code,
      // ... store other payment-related data
    });

    await payment.save();

    res.status(200).send("Payment received successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { handlePaymentCallback };
