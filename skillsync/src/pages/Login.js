import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user'); // default to 'user'
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    let role; // Define a local variable to determine the user role
  
    if (username === "admin" && password === "admin123") {
      role = 'admin';
    } else {
      role = 'user';
    }
  
    // Now, update the local storage using the local variable
    localStorage.setItem('userRole', role);
  
    // Also, update the state
    setUserRole(role);
  
    if (role === 'admin') {
      navigate("/UserList");
    } else {
      navigate("/ViewProfile");
    }
  };
  return (
    <div className="login-wrapper">
      <h1>Welcome to SkillSync!</h1>
      <form onSubmit={handleLogin}>
        <label>
          <p>Username</p>
          <input 
            type="text" 
            placeholder='Enter username here' 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input 
            type="password" 
            placeholder='Enter password here' 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Log in</button>
        </div>
        <br/>
        <Link to="/Register">Doesn't have an account? Sign up here</Link>
      </form>
    </div>
  )
}
