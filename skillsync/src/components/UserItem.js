import React, { useState, useEffect } from 'react'; 
import './UserItem.css';
import { Link } from 'react-router-dom';
import graphQLFetch from '../pages/api.js'; 

function UserItem({ user }) {
  const numberOfSkills = user.profile.skills.length;
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skillsWithDetails = await Promise.all(
        user.profile.skills.map(async (skillItem) => {
          const query = `query {
            getSkill(id: "${skillItem.skill_id}") {
              id
              name
            }
          }`;
          const result = await graphQLFetch(query);
          return result.getSkill;
        })
      );
      setSkills(skillsWithDetails);
    };

    fetchSkills();
  }, [user.profile.skills]);

  return (
    <div>
<Link to={`/ViewProfile?userId=${user.id}`}>
        <div className="user-item">
          <img src={user.profile.avatar} width="100" height="50" /> 
          <h2>{user.username}</h2>
          <div className="location-bubble">{user.profile.location}</div>
          <p><h3>{numberOfSkills}</h3></p>
          <p>Skills to Share</p>
          <div>
            {skills.map((skill, index) => (
              <div key={index} className="skill-box">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
        </Link>
    </div>
  );
}


  export default UserItem;
  