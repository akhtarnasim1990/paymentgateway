const paypal = require("paypal-rest-sdk");
require("dotenv").config();
const { createPayment, getPayment, updatePayment, deletePayment } = require("./payment");

paypal.configure({
  mode: process.env.PAYPAL_MODE, // sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Route to create PayPal payment

module.exports.createPaypalPayment = async (req, res) => {
  const { amount, user_info } = req.body;

  console.log("user_info", user_info);

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount,
        },
        description: "Test Payment",
      },
    ],
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.response });
    } else {
      if (payment.state === "created") {
        const approval_url = payment.links.find((link) => link.rel === "approval_url").href;
        createPayment({ ...user_info, payment_id: payment.id, state: payment.state, token: approval_url.split("&token=")[1] })
          .then((response) => {
            console.log("Payment created:", response);
            console.log("payment", payment);
            res.json({ approval_url });
          })
          .catch((error) => {
            console.log("error ------", error);
            res.status(500).json({ error: error });
          });
      } else {
        res.status(500).json({ error: "payment not created." });
      }
    }
  });
};

// Route to execute payment after user approval

module.exports.executePaypalPayment = async (req, res) => {
  const { paymentId, PayerID, token } = req.body;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "10.00",
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      deletePayment({ token })
        .then((deletedPayment) => console.log("Payment deleted:", deletedPayment))
        .catch((error) => console.error(error.message))
        .finally(() => res.status(500).json({ error: error.response }));
    } else {
      console.log("res", payment);
      updatePayment(paymentId, { state: payment.state })
        .then((updatedPayment) => console.log("Payment updated:", updatedPayment))
        .catch((error) => console.error(error.message));
      res.json({ payment });
    }
  });
};
