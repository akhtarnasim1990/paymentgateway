import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../assets/lottiefiles/success.json";
import "./Payment.css";
import axios from "axios";

const SuccessPayment = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const PayerID = searchParams.get("PayerID");

    if (paymentId && PayerID) {
      axios
        .post("http://localhost:8000/api/v1/payment/execute", {
          paymentId,
          PayerID,
        })
        .then((res) => {
          alert("Payment Successful");
        })
        .catch((error) => {
          alert("Payment Execution Failed");
        });
    }
  }, [searchParams]);
  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Thank You</h2>
        <Lottie animationData={successAnimation} loop={true} className="lottie-animation" />
        <p>Thank you for your purchase! Your payment has been successfully processed.</p>
        <Link to="/checkout">
          <button className="payment-btn">Back to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
