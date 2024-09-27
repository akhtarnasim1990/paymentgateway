const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    payment_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/, // Basic email validation
    },
    phone: {
      type: String,
      required: true,
      match: /^\d{10}$/, // Validates a 10-digit phone number
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      match: /^\d{5,6}$/, // Matches 5- or 6-digit postal codes
    },
    cardNumber: {
      type: String,
      required: true,
      match: /^\d{16}$/, // Validates a 16-digit card number
    },
    expiryDate: {
      type: String,
      required: true,
      match: /^(0[1-9]|1[0-2])\/\d{2}$/, // Matches MM/YY format
    },
    cvv: {
      type: String,
      required: true,
      match: /^\d{3,4}$/, // Validates a 3- or 4-digit CVV
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
