import React from 'react';
import {Link, useLocation } from "react-router-dom";
import pic from '../pic.jpg';
import './Login.css';
import MapContainer from './MapContainer';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { Box, Typography, Grid, Slider } from '@mui/material';

const Profile = ({ user }) => {
  // const location = useLocation();
  // const user = location.state.user; 
  if(!user) {
    alert("Please Log in first!!!");
  }
  console.log("profile: "+ user.username);
//   const user = {
//     username: 'JohnDoe',
//     gender: 'Male',
//     age: '21',
//     skills: ['React', 'JavaScript', 'CSS'],
//     interested:['Swimming','Soccer'],
//     neighborhood: 'Sample Neighborhood',
//     avatarUrl: '',
// };
  const getTagStyle = (skill) => {
    switch (skill) {
      case 'React':
        return { backgroundColor: 'red', color: 'white' };
      case 'JavaScript':
        return { backgroundColor: 'orange', color: 'white' };
      case 'CSS':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return {backgroundColor: 'grey', color: 'white' };
    }
  };

  const sliderStyle = {
    width: '95%',
    margin: '0 auto',
  };
  
  const ReviewGrid = ({ userName, service, rating, content }) => {
    return (
      <Box border={1} p={2} m={2} width={300} height={250} marginRight={90} className='box'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="left">
              {userName}
            </Typography>
            <Typography variant="caption" align="right">
              {service}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Slider
              value={rating}
              max={100}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              style={sliderStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{content}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const isCurrentUser = user.username === user.username;

  return (
    <div>
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
            <img src={pic} className="App-logo" alt="logo" /> <br />
          </div>
          <div>
            <strong>My Skills: </strong>
            {/* <div>
              {user.skills.map((skill, index) => (
                <div key={index} style={{ ...getTagStyle(skill), padding: '4px', margin: '2px', display: 'inline-block', borderRadius: '4px' }}>
                  {skill}
                </div>
              ))}
            </div> */}
          </div>
          <div>
            <strong>Interests: </strong>
            {/* <div>
              {user.interested.map((skill, index) => (
                <div key={index} style={{ ...getTagStyle(skill), padding: '4px', margin: '2px', display: 'inline-block', borderRadius: '4px' }}>
                  {skill}
                </div>
              ))}
            </div> */}
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
        
        {isCurrentUser ? (
        <button type='edit'><Link to="/EditProfile" className="button-link">Edit</Link></button>
      ) : (
        <button type='invite'>Invite</button>
      )}

      </div>
      <div className='grid'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} className='grid'>
              <ReviewGrid
                userName="John Doe"
                service="Basketball"
                rating={60}
                content="This is a great service! I highly recommend it."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='grid'>
              <ReviewGrid
                userName="Alice Smith"
                service="Badminton"
                rating={85}
                content="Excellent service and very professional."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='grid'>
              <ReviewGrid
                userName="Mike Johnson"
                service="Programming"
                rating={75}
                content="Good experience, would use again."
              />
            </Grid>
          </Grid>
      </div>
    </div>
  );
};

export default Profile;