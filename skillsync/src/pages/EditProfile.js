import React, { useState } from 'react';
import pic from '../pic.jpg';
import graphQLFetch from './api';
import './Login.css';

const EditProfile = ({ user }) => {
  // const [user, setUser] = useState('');
//     username: 'JohnDoe',
//     gender: 'Male',
//     age: '21',
//     skills: ['React', 'JavaScript', 'CSS'],
//     interested:['Swimming','Soccer'],
//     neighborhood: 'Sample Neighborhood',
//     avatarUrl: '',
// });

const [newusername, setNewUsername] = useState('');
const [password, setPassword] = useState('');
const [age, setAge] = useState('');
const [gender, setGender]= useState('');
const [postcode, setPostcode] = useState('');
const [avatar, setAvatar] = useState(null);
const [errors, setErrors] = useState({});
const [isValidPassword, setValidPassword] = useState(true);
const [isValidPost, setValidPost] = useState(true);
const [isValidAge, setValidAge] = useState(true);

const username = user.username;

const formData = new FormData();


  const setUser = (newuser) => {
    user = newuser;
  };

  
  const handleUsernameChange = (event) => {
    // console.log(event.target.value);
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    
    const value = event.target.value;
    const isValidPassword = value.length >= 6; 
    setValidPassword(isValidPassword);
    setPassword(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    
    const value = event.target.value;
    const isValidPost = value.length == 6; 
    setValidPost(isValidPost);
    setPostcode(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    formData.append('avatar', file);
    setAvatar(file);
  };

  const handleGenderChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    const isValidAge = parseInt(value) <= 120; 
    setValidAge(isValidAge);
    const newValue = value.replace(/\D/g, '').slice(0, 3);
    setAge(newValue);
  };


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };


  const handleSave = async (event) => {
    event.preventDefault();
    validateForm();
    const editProfileMutation = `
      mutation editProfile($username: String!, $newusername: String, $password: String, $gender: String,$profile:UserProfileInput) {
        editProfile(username:$username, newusername:$newusername, password:$password,gender:$gender,profile:$profile) {
          username
          password
          gender
          profile{
            age
            location
            avatar
          }
        }
      }`;
      
    const editData = {
      username: username,
      newusername: !newusername ? "" : newusername,
      password: !password? "" : password,
      gender: !gender? "" : gender,
      profile:{
        age:!age? 0 : age,
        location:!postcode? "" : postcode,
        avatar: avatar,
        // userskill:skills,
      },
    };
    console.log(editData); //success
    
    try {
      const data = await graphQLFetch(editProfileMutation, editData);
      if(data.editProfile){
        alert("Profile updated " + username);
      }
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate username
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    setErrors(errors);
  };


  return (
    <div className="register-wrapper">
      <h2>Edit Profile</h2>
      <div>
        <strong>Username: </strong>
        <input
          type="text"
          name="username"
          value={newusername}
          onChange={handleUsernameChange}
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>
      <div>
        <strong>Password: </strong>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
         {!isValidPassword && <p className="error-message">Password must be at least 6 characters long.</p>}
      </div>
      
      <div>
        <strong>Gender: </strong>
        <select id="gender" name="gender" onChange={handleGenderChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
        </select>
      </div>
      <div>
        <strong>Age: </strong>
        <input
          type="text"
          name="age"
          value={age}
          onChange={handleAgeChange}
        />
        {!isValidAge && <p className="error-message">Age must be a number less than 120</p>}
      </div>
      <div>
        <strong>Skills: </strong>
        <div>
          {/* {user.userskill.map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: getColorForSkill(skill),
                color: 'white',
                padding: '4px',
                margin: '2px',
                display: 'inline-block',
                borderRadius: '4px',
              }}
            >
              {skill}
            </div>
          ))} */}
        </div>
      </div>
      
      <div>
        <strong>Interests: </strong>
        <div>
          {/* {user.wantedskill.map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: getColorForSkill(skill),
                color: 'white',
                padding: '4px',
                margin: '2px',
                display: 'inline-block',
                borderRadius: '4px',
              }}
            >
              {skill}
            </div>
          ))} */}
        </div>
      </div>

      <div>
        <strong>Avatar: </strong>
        {avatar && <img src={URL.createObjectURL(avatar)} className="App-logo" alt="avatar" />}
        <input type="file" id="avatar" name="avatar" onChange={handleAvatarChange} />
        {/* <img src={pic} className="App-logo" alt="logo" />
        <input type="file" id="avatar" name="avatar"/> */}
      </div>
      <div>
        <strong>Neighborhood: </strong>
        <input
          type="text"
          name="postcode"
          value={postcode}
          onChange={handlePostcodeChange}
        />
         {!isValidPost && <p className="error-message">Postcode must be 6 characters long.</p>}
     </div>

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
};

const getColorForSkill = (skill) => {
  switch (skill) {
    case 'React':
      return 'red';
    case 'JavaScript':
      return 'yellow';
    case 'CSS':
      return 'green';
    default:
      return 'black';
  }
};

export default EditProfile;
