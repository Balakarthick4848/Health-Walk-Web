import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom'; 
import { useAuth } from "../context/AuthContext";
import ReCAPTCHA from 'react-google-recaptcha';
import background from '../assets/images/background.jpg';
import logo from '../assets/images/logo.png';
import '../styles/Login.css'; 
import API_BASE_URL from '../config'; 
import { FaEye  } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";

function LoginPage() {
  const [captchaVal, setCaptchaVal] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaEyeSlash);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate(); 

  //password eye icon toggle
  const handleToggle = () => {
   if (type==='password'){
      setIcon(FaEye);
      setType('text')
   } else {
      setIcon(FaEyeSlash)
      setType('password')
   }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    let url= `${API_BASE_URL}/admin/login`;
    // url = 'https://mocki.io/v1/a5a086db-eb2d-40e6-98af-1181da3215af'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      login(); // Update authentication state
      navigate('/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('Network error');
  }
  setLoading(false);
};

  return (
    <div className="login-wrapper">
      <div className="left-panel">
          <div className="curve-top-left" />
          
        <h1 className="brand-title">Health<br />Walk{data.email}</h1>
        <div className="curve-bottom-right" />
        {/* Optional decorative blobs or background images */}
      </div>
      <div className="right-panel">
        <img className="logo" src={logo} alt="Logo" />
        <div className="form-container">
          <h2>Admin Login!</h2>
          <p>Clarity gives you the blocks and components you need...</p>
          <form onSubmit={handleSubmit}>
            <label>Email address</label>
            <input type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              required/>

            <label>Password</label>
<div className="password-input-container" style={{ position: 'relative' }}>
  <input
    type={type}
    placeholder="Password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
    style={{
    height: '50px',
    width: '100%',
    paddingRight: '40px',
    paddingLeft: '12px',
    backgroundColor: '#f9fafb',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
   marginBottom: '1rem',

    }}
  />
  <span
    onClick={handleToggle}
    style={{
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#666'
    }}
  >
    {type === 'password' ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
  </span>
</div>
            <div className="form-footer">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/verification" >Forgots password?</a>
            </div>

            <ReCAPTCHA
              sitekey="6Ldh4okrAAAAANjyohmLg8AlAuK2C2flDNVn_8Gi"
              onChange={(val) => setCaptchaVal(val)}
            />

            <button type="submit" disabled={!captchaVal}>
              Sign in
            </button>
          </form>
        </div>
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
export default LoginPage;