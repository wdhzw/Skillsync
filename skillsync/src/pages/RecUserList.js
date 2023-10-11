import React from 'react';
import UserItem from '../components/UserItem.js';
import '../pages/UserList.css'; 
import SideNav from '../SideNav.js';


export default function RecUserList() {
    const users = [ 
    {id: 1, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 2, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 3, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 4, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 5, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 6, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 7, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 8, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 9, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 10, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 11, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
    {id: 12, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},

  ];

      return (

        <div className="userlist-wrapper">
        <SideNav/>

          <h1>Top 12 Recommended Users</h1>
          <div className="search">
            <p>Users here are recommended based on the closest match between the skills you have, the skills you want to learn, age, location and gender. Users you have already sent an invitation to, or have initiated a chat with, are not shown. </p>
          </div>


          <div className="user-grid">
            {
              users.map(function(user) {
                return (
                  <div className="user-grid-item">
                    <UserItem user={user} />
                  </div>
                );
              })
            }
          </div>

        </div>
      );
        
  }