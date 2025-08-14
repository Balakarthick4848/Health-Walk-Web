import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import background from '../assets/images/background.jpg';
import logo from '../assets/images/logo.png';
import '../styles/Login.css'; 
import API_BASE_URL from '../config'; 

function ForgotPassword() {
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
      const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')            
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [email, setEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const navigate = useNavigate(); 

    // function onSubmit(data) {
    //     // display form data on success
    //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    //     return false;
    // }

  const passwordSubmit = async (data) => {
  setLoading(true);
  setError('');
    const email = localStorage.getItem('resetEmail'); 
  try {
    let url= `${API_BASE_URL}/auth/reset/password`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, newPassword: data.password }),
    });
    const result = await response.json();
    if (response.ok) {
      alert('Password reset successful!');
      navigate('/');
    } else {
      setError(result.message || 'Password reset failed');
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
          
        <h1 className="brand-title">Health<br />Walk</h1>
        <div className="curve-bottom-right" />
        {/* Optional decorative blobs or background images */}
      </div>
      <div className="right-panel">
        <img className="logo" src={logo} alt="Logo" />
        <div className="form-container">
          <h2>Reset Password</h2>
          <p>Clarity gives you the blocks and components you need...</p>
          {/* <form onSubmit={handleSubmit}>
            <label>New Password</label>
<div className="password-input-container" style={{ position: 'relative' }}>
  <input
    type= "password"
    placeholder="Password"
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
</div>
            <button type="submit" >
              Change Password
            </button>
          </form> */}
          <form onSubmit={handleSubmit(passwordSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <input name="password" 
                                   onChange={e => setnewPassword(e.target.value)}
                                   type="password" {...register('password')} 
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <input name="confirmPassword" 
                            onChange={e => setnewPassword(e.target.value)}
                            type="password" {...register('confirmPassword')} 
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                        {/* <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button> */}
                    </div>
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
export default ForgotPassword;