"use client";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "@/common/utils";

const ForgotPasswordPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Change Password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post(`${BaseUrl}/api/sendOtp`, { email });
      setMessage(res.data.message);
      setStep(2); // Move to OTP step
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(errorMsg);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post(`${BaseUrl}/api/verify-otp`, { email, otp });
      setMessage(res.data.message);
      setStep(3); // Move to password change step
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to verify OTP. Please try again.";
      setError(errorMsg);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post(`${BaseUrl}/api/change-password`, {
        email,
        newPassword,
      });
      setMessage(res.data.message);
      // Optionally close the popup after successful password change
      setTimeout(onClose, 2000); // Close after 2 seconds
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to change password. Please try again.";
      setError(errorMsg);
    }
  };

  if (!isOpen) return null;

  const onClickClose = () => {
    setStep(1);
    onClose();
    setMessage("");
    setError("");
    setOtp("");
    setNewPassword("");
    setEmail("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClickClose}>
          ✖
        </button>
        <h2>Forgot Password</h2>
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              Verify OTP
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleChangePassword}>
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              Change Password
            </button>
          </form>
        )}
        {message && <p className="message success-message">{message}</p>}
        {error && <p className="message error-message">{error}</p>}
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          width: 400px;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #555;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        label {
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
          display: block;
        }
        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          transition: border 0.3s;
        }
        input:focus {
          border: 1px solid #0070f3;
          outline: none;
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }
        .submit-btn:hover {
          background: #005bb5;
        }
        .message {
          text-align: center;
          margin-top: 15px;
        }
        .success-message {
          color: green;
        }
        .error-message {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPopup;
