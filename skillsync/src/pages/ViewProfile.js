import React from 'react';
import pic from '../pic.jpg';
import './Login.css';
import MapContainer from './MapContainer';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
    <div className='whole'>
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
          <strong>Avatar: </strong>
          <img src={pic} className="App-logo" alt="logo" /> </div>
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
          <strong>Neighborhood: </strong>
          {user.neighborhood}
          <MapContainer/>
        </div>
        <br/>
        <h3>Reviews</h3>
        
      </div>
      <div class="grid-container">
          <div class="grid-item">
            <p className='item-text'>
            <GradeIcon className='icon'/>
              Rating:<br/> 
              7/10
            </p>
        </div>
      </div>
      <div class="grid-container">
          <div class="grid-item">
            <p className='item-text'>
            <ThumbUpIcon className='icon'/>
              Match:<br/> 
              16 times
            </p>
        </div>
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
