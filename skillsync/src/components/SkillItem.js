import React from 'react';
import './SkillItem.css';
import { Link } from 'react-router-dom';

function SkillItem({ skill }) {
    return (
      <div>
      <Link to="/SkillDetails">

      <div className="skill-item">
          <img src={skill.picture}/>
          <h2>{skill.name}</h2>
        
      </div>
      </Link>
      </div>
    );
  }
  
  export default SkillItem;
  