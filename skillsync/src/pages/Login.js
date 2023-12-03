import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import graphQLFetch from './api';
import { AuthContext } from '../AuthContext.js';
export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user'); // default to 'user'
  // const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
      const loginMutation = `
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          email
          gender
          rating
          suc_match
          profile {
            age
            location
            avatar
            postal
            skills {
              skill_id
              level
            }
            wanted_skills
          }
          chats {
            id
          }
        }
      }      
    `;

    const loginData = {
      username: username,
      password: password,
    };
    
    try {
      const data = await graphQLFetch(loginMutation, loginData);
      console.log(data);
      if(data.login){
        setLoggedInUser(data.login);
        console.log('Updated loggedInUser:', loggedInUser);
        alert("User loggedin with username " + username);
      }
      console.log('User Logged in :', data.login);
      onLogin(data.login);

      console.log("set onlogin");
      let role; // Define a local variable to determine the user role
    
      if (username === "admin" && password === "admin123") {
        role = 'admin';
        alert('Logged in as admin! Redirected to the Users page.'); 
      } else {
        role = 'user';
      }
    
      // Now, update the local storage using the local variable
      localStorage.setItem('userRole', role);
      localStorage.setItem('userid', parseInt(data.login.id,10));

      // Also, update the state
      setUserRole(role);
    
      if (role === 'admin') {
        navigate("/UserList");
      } else {
        navigate("/ViewProfile", { state: { user: loggedInUser } });
      }
      
    } catch (error) {
      alert(""+ error);
      console.error('Error logging in :', error);
    };

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
