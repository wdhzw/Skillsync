import React from 'react';
import logo from '../logo.svg';
import './Login.css';
import MapContainer from './MapContainer';

const Profile = () => {
  const user = {
    username: 'JohnDoe',
    gender: 'Male',
    age: '21',
    skills: ['React', 'JavaScript', 'CSS'],
    neighborhood: 'Sample Neighborhood',
    avatarUrl: '',
};
  const getTagStyle = (skill) => {
    switch (skill) {
      case 'React':
        return { backgroundColor: 'red', color: 'white' };
      case 'JavaScript':
        return { backgroundColor: 'orange', color: 'white' };
      case 'CSS':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return {};
    }
  };


  return (
    <div className="register-wrapper">
      <h1>Welcome to SkillSync!</h1>
      <h3>Profile</h3>
      <div>
        <strong>Username: </strong>
        {user.username}
      </div>
      <div>
        <strong>Gender: </strong>
        {user.gender}
      </div>
      <div>
        <strong>Age: </strong>
        {user.age}
      </div>
      <div>
        <strong>Skills: </strong>
        <div>
          {user.skills.map((skill, index) => (
            <div key={index} style={{ ...getTagStyle(skill), padding: '4px', margin: '2px', display: 'inline-block', borderRadius: '4px' }}>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div>
        <strong>Avatar: </strong>
        <img src={logo} className="App-logo" alt="logo" /> </div>
      <div>
        <strong>Neighborhood: </strong>
        {user.neighborhood}
        <MapContainer/>
        
      </div>
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

export default Profile;
