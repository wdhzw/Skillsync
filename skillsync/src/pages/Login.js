import React from 'react';
import './Login.css';

export default function Login() {
  return(
    <div className="login-wrapper">
      <h1>Welcome to SkillSync!</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Log in</button>
        </div>
        <a href = "/register">Doesn't have an account? Sign up here</a>
      </form>
    </div>
  )
}