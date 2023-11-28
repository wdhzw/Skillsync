import React from 'react';
import './SkillItem.css';
import { Link } from 'react-router-dom';

function SkillItem({ skill }) {
    return (
      <div>

      <div className="skill-item">
          <img src={skill.pic}/>
          <h2>{skill.name}</h2>
        
      </div>
      </div>
    );
  }
  
  export default SkillItem;
  