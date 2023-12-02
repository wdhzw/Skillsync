import React, { useState, useEffect } from 'react';
import {Link, useLocation,useNavigate } from "react-router-dom";
import pic from '../pic.jpg';
import './Login.css';
import MapContainer from './MapContainer';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import graphQLFetch from './api';

import { Box, Typography, Grid, Slider } from '@mui/material';


const Profile = ({ user }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var userId = queryParams.get('userId');
  var urlparameter=false;

  var loggedinuserId=localStorage.getItem('userid');
  
  if (queryParams.get('userId')){
    urlparameter=true;
  }

  const navigate = useNavigate();

  if (!loggedinuserId && !urlparameter) {
    alert("Please Log in first!!!");
    navigate("/Login");
  } 
  
  if (loggedinuserId && !urlparameter) {
    userId= loggedinuserId;
  }

  userId=parseInt(userId,10);

  console.log("retrieving user id");
  console.log(userId);

  const [userData, setUserData] = useState(null);
  const [skillsList, setSkillsList] = useState([]);
  const [skillNameToId, setSkillNameToId] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null); 

  useEffect(() => {
    fetchSkills();
    fetchUser(userId,10);
  }, [userId,10]);


const getUserQuery = `
  query getUser($id: Int!) {
    getUserById(id: $id) {
      id
      username
      gender
      profile {
        age
        location
        postal
        avatar
        skills {
          skill_id
          level
        }
        wanted_skills
      }
    }
  }
`;


const fetchUser = async (userId) => {
  try {
    const data = await graphQLFetch(getUserQuery, { id: userId });
    if (data) {
      console.log(data);
      setUserData(data.getUserById);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};


const fetchSkills = async () => {
  const query = `query {
      getAllSkills {
          id
          name
          description
          pic
      }
  }`;

  try {
    const data = await graphQLFetch(query);
    if (data) {
      const idToSkillNameMapping = {};
      data.getAllSkills.forEach(skill => {
        idToSkillNameMapping[skill.id] = skill.name;
      });
      setSkillsList(data.getAllSkills);
      setSkillNameToId(idToSkillNameMapping); 
    }

  } catch (error) {
    console.error('Error fetching skills:', error);
  }
};

  
  //const isCurrentUser = user.username === user.username;

  return (
    <div>
      <div className='whole'>
        <div className="register-wrapper">
          <h1>Viewing Profile</h1>
          <h3>Profile</h3>
          {userData ? (
          <>

          <div>
          <strong>Username: </strong>{userData.username}
        </div>
        <div>
          <strong>Gender: </strong>{userData.gender}
        </div>
        <div>
          <strong>Age: </strong>{userData.profile.age}
        </div>



          <div>
          <strong>Avatar: </strong>
          {userData.profile.avatar ? (
            <img src={`${userData.profile.avatar}`} className="profile-avatar" alt="avatar" />
          ) : (
            <span>No avatar available</span>
          )}
        </div>



          <div>
          <strong>My Skills: </strong>
          <ul>
          {userData.profile.skills.map(skill => (
      <li key={skill.skill_id}>{skillNameToId[skill.skill_id]}: {skill.level}</li>
            ))}
          </ul>
        </div>


          <div>
          <strong>Interests (Wanted Skills): </strong>
          <ul>
          {userData.profile.wanted_skills.map(skillId => (
          <li key={skillId}>{skillNameToId[skillId]}</li>
          ))}
          </ul>
          </div>
          
          <div>
          <strong>Neighborhood: </strong>{userData.profile.location}
          </div>

          <div>
          <strong>Postal Code: </strong>{userData.profile.postal}

          <MapContainer/>
        </div>
        </>
        ) : (
          <p>Loading user data...</p>
        )}


        </div>

        {
  loggedinuserId && !urlparameter ? (
    <button type='edit'>
      <Link to={{ pathname: "/EditProfile", state: { user: user } }} className="button-link">
        Edit
      </Link>
    </button>
  ) : (
    <button type='edit'>Chat</button>
  )
}

      </div>

    </div>
  );
      
};

export default Profile;