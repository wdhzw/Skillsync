import React from 'react';
import './SkillItem.css';
 
function SkillItem({ skill }) {
    return (
      <div className="skill-item">
        <img src={skill.picture}/>
        <h2>{skill.name}</h2>
      </div>
      
    );
  }
  
  export default SkillItem;
  