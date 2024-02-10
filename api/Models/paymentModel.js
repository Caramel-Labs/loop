const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  merchant_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status_code: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const PaymentModel = mongoose.model("Payment", paymentSchema);

module.exports = { PaymentModel };
