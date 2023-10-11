import React from 'react';
import './SkillItem.css';
 
function SkillItem({ skill }) {
    return (
      <div className="skill-item">
        <img src={skill.picture} width="100" height="100" />
        <h2>{skill.name}</h2>
      </div>
    );
  }
  
  export default SkillItem;
  