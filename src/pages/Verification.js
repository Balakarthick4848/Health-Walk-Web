import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom'; 
import background from '../assets/images/background.jpg';
import logo from '../assets/images/logo.png';
import '../styles/Login.css'; 
import OtpInput from 'react-otp-input';
// import { height, width } from '@mui/system';
import API_BASE_URL from '../config'; 

function Verification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false); 
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

    const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      // let body = { email: 'svetrivel002@gmail.com' };
      const response = await fetch(`${API_BASE_URL}/auth/send/otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('OTP sent to your email!');
        setShowOtpForm(true);
        // Optionally, navigate to OTP verification page
        //  navigate('/verification');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const verifyotp = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    let url= `${API_BASE_URL}/auth/verify/otp`;
    // url = 'https://mocki.io/v1/a5a086db-eb2d-40e6-98af-1181da3215af'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('OTP verified!');
      localStorage.setItem('resetEmail', email);
      navigate('/forgotpassword');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('Network error');
  }
  };

  return (
    <div className="login-wrapper">
      <div className="left-panel">
          <div className="curve-top-left" />
          
        <h1 className="brand-title">Health<br />Walk</h1>
        <div className="curve-bottom-right" />
        {/* Optional decorative blobs or background images */}
      </div>
      <div className="right-panel">
        <img className="logo" src={logo} alt="Logo" />
{!showOtpForm && (
  <div className="form-container">
    <h2>Email VERIFICATION</h2>
    <p>Enter a email address to sent a OTP.</p>
    <form onSubmit={handleForgotPassword}>
      <label>Email address</label>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  </div>
)}
{showOtpForm && (
  <div className="form-container">
    <h2>OTP VERIFICATION</h2>
    <p>We've sent a verification code to your email address. Please enter it below to continue.</p>
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      inputStyle={{
        borderRadius: "8px",
        width: "54px",
        height: "54px",
        fontSize: "14px",
        color: "#000",
        fontWeight: "400",
        caretColor: "blue"
      }}
      renderSeparator={<span style={{ width: "8px" }}> </span>}
      renderInput={(props) => <input {...props} />}
    />
    <div style={{ marginTop: '15px', fontSize: '14px' }}>
      Didn't get a code?
      <a href="/verification"> Click to resend</a>
    </div>
    <button type="submit" onClick={verifyotp}>
      Verify
    </button>
  </div>
)}
      </div>
      <div
        className="background-image"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.15, 
        }}>
        <img src={background} alt="Background" style={{ maxHeight: "500px" }} />
      </div>
    </div>
  );
}
export default Verification;