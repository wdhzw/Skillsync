import React, { useState } from 'react';
import './Login.css';
import SideNav from '../SideNav';
import MapContainer from './MapContainer';

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateForm();
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
    if (postcode.length != 6) {
      errors.postcode = 'Postcode should be at 6 digits';
    }
    // Validate age
    if (parseInt(age) > 120) {
      errors.age = 'Age must be a number less than 120';
    }

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
          <input type="text" value={age} onChange={handleAgeChange} required/>
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
                <select id="skill" class = "skill" name="skill" type ="horizontal">
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
                <select id="skill" class = "skill" name="skill" type ="horizontal">
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
        <input type="postcode" value={postcode} onChange={handlePostcodeChange} required/>
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