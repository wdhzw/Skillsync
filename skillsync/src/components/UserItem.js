import React from 'react';
import './UserItem.css';
import { Link } from 'react-router-dom';

function UserItem({ user }) {
    return (
                
      <div>
      <Link to="/ViewProfile">

      <div className="user-item">
        <img src={user.picture} width="100" height="50"/>
        <h2>{user.name}</h2>
        <div className="location-bubble">{user.location}</div>
        <p><h3>{user.noofskills}</h3></p>
        <p>Skills to Share</p>
        <div>
          {user.skills.map((skill) => (
            <div className="skill-box">
              {skill}
            </div>
          ))}
        </div>
        

      </div>
      </Link>
      </div>
    );
  }
  
  export default UserItem;
  