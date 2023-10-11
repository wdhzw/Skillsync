import React from 'react';
import UserItem from '../components/UserItem.js';
import '../pages/UserList.css'; 
 

export default function UserList() {
    const users = [
    {id: 1, name: 'John Ng', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 2, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 3, name: 'John Ng', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 4, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 5, name: 'John Ng', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 6, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 7, name: 'John Ng', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 8, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
    {id: 9, name: 'John Ng', location:'Hougang',noofskills:8,picture:'./images/avatar.jpg',skills:['programming','golf','cooking','database design','French']},
];

      return (
        <div>
          <h1>List of Users</h1>
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