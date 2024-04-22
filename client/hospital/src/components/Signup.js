import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await fetch('/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Handle successful signup
        console.log(data);
        // Redirect to home page after successful signup
        navigate('/home');
      } else {
        // Handle signup error
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title"> SIGNUP TO <span>MEDICARE HOSPITAL</span></h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <label htmlFor="username" className="signup-label">Username:</label><br />
        <input type="text" id="username" className="signup-input" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label htmlFor="password" className="signup-label">Password:</label><br />
        <input type="password" id="password" className="signup-input" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label><br />
        <input type="password" id="confirmPassword" className="signup-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <p className="login-link">Already have an account? <button onClick={() => navigate('/login')} className="login-button">Login</button></p>
    </div>
  );
}

export default SignupForm;
