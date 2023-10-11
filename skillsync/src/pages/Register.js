import React from 'react';
import './Login.css';

export default function Register() {
  return(
    <div className="register-wrapper">
      <h1>Welcome to SkillSync!</h1>
      <h3>Registration</h3>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <label>
          <p>Age</p>
          <input type="age" />
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

        <label htmlFor="postalCode">
            <p>Postal Code</p>
        </label>
        <input type="text" id="postalCode" name="postalCode"/><br />

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}