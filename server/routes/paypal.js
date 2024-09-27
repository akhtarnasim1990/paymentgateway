var express = require("express");
var paymentRouter = express.Router();

const { createPaypalPayment, executePaypalPayment } = require("../controllers/paypal");

paymentRouter.post("/create", createPaypalPayment);
paymentRouter.post("/execute", executePaypalPayment);

module.exports = paymentRouter;
