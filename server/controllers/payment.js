const mongoose = require("mongoose");
const Payment = require("../models/payment");

// Create a new payment document
const createPayment = async (paymentData) => {
  console.log("paymentData", paymentData);
  try {
    const oldPayment = await getPayment(paymentData.payment_id);
    console.log("oldPayment", oldPayment);
    if (!oldPayment) {
      const payment = new Payment(paymentData);
      await payment.save();
      return payment;
    }
  } catch (error) {
    console.log("error++++++++++", error);
    throw new Error("Failed to create payment: " + error.message);
  }
};

// Read a payment document by Payment ID
const getPayment = async (paymentId) => {
  const payment = await Payment.findOne({ payment_id: paymentId });
  if (!payment) {
    return null;
  }
  return payment;
};

// Update payment document by Payment ID
const updatePayment = async (paymentId, updateData) => {
  try {
    const updatedPayment = await Payment.findOneAndUpdate({ payment_id: paymentId }, updateData, { new: true });
    if (!updatedPayment) {
      throw new Error("Payment not found.");
    }
    return updatedPayment;
  } catch (error) {
    throw new Error("Failed to update payment: " + error.message);
  }
};

// Delete a payment document by ID
const deletePayment = async (paymentId) => {
  try {
    const deletedPayment = await Payment.findOneAndDelete({ ...paymentId });
    if (!deletedPayment) {
      throw new Error("Payment not found.");
    }
    return deletedPayment;
  } catch (error) {
    throw new Error("Failed to delete payment: " + error.message);
  }
};

module.exports = {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
};
