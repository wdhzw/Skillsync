import React from 'react';
import UserItem from '../components/UserItem.js';
import '../pages/UserList.css'; 
import SideNav from '../SideNav.js';


export default function UserList() {
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
];

      return (

        <div className="userlist-wrapper">
        <SideNav/>

          <h1>List of Users</h1>
          <div className="search">
            <input type="text" placeholder="Search by user name"/>
          </div>
          <div className="sortnfilter">
            <div className="filters">
              Filter By:
              <select>
                <option value="">Location</option>
                <option value="Hougang">Hougang</option>
                <option value="AngMoKio">Ang Mo Kio</option>
              </select>
              <select>
                <option value="">Skills to Share</option>
                <option value="Programming">Programming</option>
                <option value="Golf">Golf</option>
              </select>
              <select>
                <option value="">Skills to Receive</option>
                <option value="Programming">Programming</option>
                <option value="Golf">Golf</option>
              </select>
            </div>
            <div className="sort">
              Sort By:
              <select>
                <option value="SkillstoShare">No of Skills to Share</option>
                <option value="SkillstoReceive">No of Skills to Receive</option>
              </select>
            </div>
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