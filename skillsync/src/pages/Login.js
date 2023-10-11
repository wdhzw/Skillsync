import React from 'react';
import './Login.css';
import SideNav from '../SideNav';

export default function Login() {
  return(
    
    <div className="login-wrapper">
      <SideNav/>
      <h1>Welcome to SkillSync!</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" placeholder='Enter username here'/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" placeholder='Enter password here'/>
        </label>
        <div>
          <button type="submit">Log in</button>
        </div><br/>
        <a type="link" href = "/register">Doesn't have an account? Sign up here</a>
      </form>
    </div>
  )
}