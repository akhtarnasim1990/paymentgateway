import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import cancelAnimation from "../assets/lottiefiles/cancel.json";
import "./Payment.css";
import axios from "axios";

const CancelPayment = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      axios
        .post("http://localhost:8000/api/v1/payment/execute", {
          token,
        })
        .then((res) => {
          alert("Payment Successful");
        })
        .catch((error) => {
          console.log(error);
          alert("Payment Execution Failed");
        });
    }
  }, [searchParams]);
  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment Cancelled</h2>
        <Lottie animationData={cancelAnimation} loop={true} className="lottie-animation" />
        <p>It looks like your payment was cancelled. Please try again or contact support.</p>
        <Link to="/checkout">
          <button className="payment-btn">Back to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPayment;
