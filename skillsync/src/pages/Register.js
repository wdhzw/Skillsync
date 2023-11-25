import React, { useState } from 'react';
import './Login.css';
import SideNav from '../SideNav';
import MapContainer from './MapContainer';

// import graphQLFetch from './api';
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body);
    /*
    Check for errors in the GraphQL response
    */
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [postcode, setPostcode] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    const newValue = value.replace(/\D/g, '').slice(0, 3);
    setAge(newValue);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    validateForm();
    const registerMutation = `
      mutation register($username: String!, $password: String!) {
        register(username:$username, password:$password) {
          username
          password
        }
      }`;
      
    const registerData = {
      username: username,
      password: password,
    };
    console.log(registerData); //success
    
    try {
      const data = await graphQLFetch(registerMutation, registerData);
      // this.setState({ user: data.register });
      if(data.register){
        alert("User signed up with username " + username);
      }
      console.log('User signed up:', data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate username
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }

    // Validate password length
    if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }
    // if (postcode.length != 6) {
    //   errors.postcode = 'Postcode should be at 6 digits';
    // }
    // // Validate age
    // if (parseInt(age) > 120) {
    //   errors.age = 'Age must be a number less than 120';
    // }

    setErrors(errors);
  };

  return(
    <div className="register-wrapper">
      <SideNav/>
      <h1>Welcome to SkillSync!</h1>
      <h3>Registration</h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          <p>Username</p>
          <input type="text" value={username} onChange={handleUsernameChange} required/>
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={handlePasswordChange} required/>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
       </label>
        <label>
          <p>Age</p>
          <input type="text" value={age} onChange={handleAgeChange} />
          {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
        </label>

        <label>
            <p>Gender</p>
            <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </label>

        <label htmlFor="avatar">
            <p>Avatar</p>
        </label>
        <input type="file" id="avatar" name="avatar"/><br />

        <label type="select">
            <p>Confident skills</p>
            <div>
                <select id="skill1" className = "skill" name="skill" type ="horizontal">
                    <option value="badminton">badminton</option>
                    <option value="tennis">tennis</option>
                    <option value="basketball">basketball</option>
                    <option value="Programming">Programming</option>
                </select>
            </div>
            <button type="plus">+</button>
        </label>
        <label type="select">
            <p>Interested skills</p>
            <div>
                <select id="skill2" className = "skill" name="skill" type ="horizontal">
                    <option value="badminton">badminton</option>
                    <option value="tennis">tennis</option>
                    <option value="basketball">basketball</option>
                    <option value="Programming">Programming</option>
                </select>
            </div>
            <button type="plus">+</button>
        </label>

        <label htmlFor="postalCode">
            <p>Postal Code</p>
        </label>
        <input type="postcode" value={postcode} onChange={handlePostcodeChange} />
          {errors.postcode && <span style={{ color: 'red' }}>{errors.postcode}</span>}
       <MapContainer/>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
export default Register;