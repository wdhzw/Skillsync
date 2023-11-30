import React from 'react';
import './UserItem.css';
import { Link } from 'react-router-dom';

function UserItem({ user }) {
  const numberOfSkills = user.profile.skills.length;

    return (
                
      <div>
      <Link to="/ViewProfile">

      <div className="user-item">
        <img src={user.profile.avatar} width="100" height="50"/> 
        <h2>{user.username}</h2>
        <div className="location-bubble">{user.profile.location}</div>
        <p><h3>{numberOfSkills}</h3></p>
        <p>Skills to Share</p>
        <div>
        {user.profile.skills.map((skillItem, index) => (
          <div key={index} className="skill-box">
            {skillItem.skill_id}
          </div>
        ))}
      </div>

        {/* <div>
          {user.skills.map((skill) => (
            <div className="skill-box">
              {skill}
            </div>
          ))}
        </div> */}
        

      </div>
      </Link>
      </div>
    );
  }
  
  export default UserItem;
  