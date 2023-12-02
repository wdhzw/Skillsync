import React, { useState, useEffect } from 'react';
import UserItem from '../components/UserItem.js';
import '../pages/UserList.css';
import SideNav from '../SideNav.js';
import graphQLFetch from './api';

export default function RecUserList() {
  const [users, setUsers] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [skillNameToId, setSkillNameToId] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null); 

  const loggedInUserId = 1

  useEffect(() => {
    const fetchSkills = async () => {
      const query = `query {
          getAllSkills {
              id
              name
              description
              pic
          }
      }`;

      try {
        const data = await graphQLFetch(query);
        if (data) {
          const skillsMapping = {};
          data.getAllSkills.forEach(skill => {
            skillsMapping[skill.name] = parseInt(skill.id, 10);
          });
          setSkillsList(data.getAllSkills);
          setSkillNameToId(skillsMapping);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    const getUsers = async () => {
      const getAllUsersQuery = `
        query getAllUsers {
          getAllUsers {
              id
              username
              password
              gender
              rating
              suc_match
              profile {
                  age
                  location
                  avatar
                  skills {
                    skill_id
                    level
                  }
                  wanted_skills
                }
          }
        }
      `;

      try {
        const data = await graphQLFetch(getAllUsersQuery);
        if (data) {
          setUsers(data.getAllUsers);
        }
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };

    fetchSkills();
    getUsers();
  }, []);

  const handleUserSelection = (event) => {
    const newSelectedUserId = parseInt(event.target.value, 10);
    console.log("Selected User ID:", newSelectedUserId);
    setSelectedUserId(newSelectedUserId);
  };



  const filteredUsers = selectedUserId
  ? users.filter(user => {
      if (parseInt(user.id,10) === parseInt(selectedUserId,10)) {
        return false; 
      }
      const selectedUser = users.find(u => parseInt(u.id,10) === parseInt(selectedUserId,10));
      if (!selectedUser || !selectedUser.profile.wanted_skills.length) {
        return false;
      }

      return selectedUser.profile.wanted_skills.some(wantedSkill => {
        const match = user.profile.skills.some(skill => {
          return skill.skill_id === wantedSkill;
        });
        return match;
      });
    })
  : [];

  

  return (
    <div className="userlist-wrapper">
      <SideNav />
      <h1>Top Recommended Users</h1>
      <div className="search">
        <p>Users here are recommended based matching between the skills that a user has and the skills that a user wants to learn. Pick a user (or pick yourself) to find other users matching this user's skills preference!</p>

      </div>
      <div className="dropdown-container">
    <select onChange={handleUserSelection} value={selectedUserId || ""}>
      <option value="">Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.username}</option>
      ))}
    </select>
  </div>

      <div className="user-grid">
        {filteredUsers.map(user => (
          <div className="user-grid-item" key={user.id}>
            <UserItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
