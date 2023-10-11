import React from 'react';
import SkillItem from '../components/SkillItem.js';
import '../pages/SkillList.css'; 
import SideNav from '../SideNav.js';


export default function SkillList() {
    const skills = [  
    {id: 1, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 2, name: 'Football', picture:'/images/skillavatar.png'},
    {id: 3, name: 'Soccer', picture:'/images/skillavatar.png'},
    {id: 4, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 5, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 6, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 7, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 8, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 9, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 10, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 11, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 12, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 13, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 14, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 15, name: 'Golf', picture:'/images/skillavatar.png'},
    {id: 16, name: 'Golf', picture:'/images/skillavatar.png'},
  ]
;

      return (

        <div className="skilllist-wrapper">
        <SideNav/>

          <h1>List of Skills</h1>
          <div className="search">
            <input type="text" placeholder="Search by skill name"/>
          </div>

          <div className="skill-grid">
            {
              skills.map(function(skill) {
                return (
                  <div className="skill-grid-item">
                    <SkillItem skill={skill} />
                  </div>
                );
              })
            }
          </div>

        </div>
      );
        
  }