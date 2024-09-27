import React, { useState } from "react";
import "./Checkout.css";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    street: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [amount] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateExpiryDate = (expiryDate) => {
    const match = expiryDate.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) {
      setError("Please enter a valid expiry date in MM/YY format.");
      return false;
    }

    const [, month, year] = match;
    const expiry = new Date(`20${year}`, month);

    const today = new Date();
    if (expiry < today) {
      setError("Expiry date cannot be in the past.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, street, city, postalCode, cardNumber, expiryDate, cvv } = formData;

    if (!name || !email || !phone || !street || !city || !postalCode || !cardNumber || !expiryDate || !cvv) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(postalCode)) {
      setError("Please enter a valid 5-digit postal code.");
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setError("Please enter a valid 3-digit CVV.");
      return;
    }
    setLoading(true);
    createPayment();
  };

  const createPayment = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/payment/create", { amount, user_info: formData });
      if (res.status === 200 && res.statusText === "OK") {
        window.location.href = res.data.approval_url;
      } else {
        throw Error("something went wrong.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setFormData({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        country: "",
      });
      setError("");
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
            </div>

            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter your country name" />
            </div>
            <div className="input-group">
              <label htmlFor="street">Street</label>
              <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} placeholder="Enter your street address" />
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" />
            </div>

            <div className="input-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
              />
            </div>

            <div className="input-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter your card number"
              />
            </div>

            <div className="input-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" />
            </div>

            <div className="input-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="Enter your CVV" />
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="checkout-btn" disabled={loading}>
            {loading ? <div className="loader"></div> : "Proceed to Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
