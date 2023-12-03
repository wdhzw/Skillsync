import React, { useState, useEffect  } from 'react';
import UserItem from '../components/UserItem.js';
import '../pages/UserList.css'; 
import SideNav from '../SideNav.js';
import graphQLFetch from './api';
import { Link } from 'react-router-dom';

export default function UserList() {
    const [users, setUsers] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [skillsList, setSkillsList] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc'); 
    const [skillNameToId, setSkillNameToId] = useState({});

    const [editingUser, setEditingUser] = useState(null);
    const userRole = localStorage.getItem('userRole');
    const districts = [
        "Ang Mo Kio", "Bedok", "Bishan", "Bukit Batok", "Bukit Merah",
        "Choa Chu Kang", "Clementi", "Geylang", "Hougang", "Jurong East",
        "Jurong West", "Kallang", "Marine Parade", "Orchard", "Pasir Ris",
        "Punggol", "Queenstown", "Sembawang", "Sengkang", "Serangoon",
        "Tampines", "Toa Payoh", "Woodlands", "Yishun", "Jurong",
        "Bukit Timah", "Novena", "Tanglin", "Rochor"];
    
    function getUsers() {
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
                  }
            }
          }
      `;

        graphQLFetch(getAllUsersQuery)
          .then((data) => {
            setUsers(data.getAllUsers);
            console.log(users);
          })
          .catch((error) => {
            console.error('Error fetching Users:', error);
          });
      }

      skillsList.forEach(skill => {
          skillNameToId[skill.name] = skill.id;
      });
      
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
    
            const data = await graphQLFetch(query);
            if (data) {
                const skillsMapping = {};
                data.getAllSkills.forEach(skill => {
                    skillsMapping[skill.name] = parseInt(skill.id, 10); 
                });
                setSkillsList(data.getAllSkills);
                setSkillNameToId(skillsMapping);             }
    

        };
    
        fetchSkills();
    }, []);



    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    }

    const handleSkillChange = (e) => {
        setSelectedSkill(e.target.value);
        console.log('Selected skill:', e.target.value); 
    }

    console.log('Before Filtering - skillNameToId', skillNameToId);
    console.log('Before Filtering - selectedSkill', selectedSkill);
    console.log('Before Filtering - selectedSkillId', skillNameToId[selectedSkill]);
    
    const displayedUsers = users
    .filter(user => {
        if (user.username === 'admin') return false;
        const selectedSkillId = skillNameToId[selectedSkill];
        console.log('Filtering with selectedSkillId:', selectedSkillId); // Debugging
        console.log('User skills:', user.profile.skills); // Debugging
    
        return user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLocation === '' || user.profile.location === selectedLocation) &&
        (selectedSkill === '' || user.profile.skills.some(skill => parseInt(skill.skill_id,10) === parseInt(selectedSkillId,10)));
         })
    .sort((a, b) => {
        if (sortOrder === 'desc') {
            return b.profile.skills.length - a.profile.skills.length;
        } else {
            return a.profile.skills.length - b.profile.skills.length;
        }
    });


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="userlist-wrapper">
            <SideNav />

            <h1>List of Users</h1>
            <div className="search">
                <input type="text" placeholder="Search by user name" value={searchTerm} onChange={handleSearchChange}/>
            </div>

            <div className="sortnfilter">
                <div className="filters">
                Filter By:
                <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Location</option>
                {districts.map(district => (
                <option key={district} value={district}>{district}</option>
                ))}
                </select>

                <select value={selectedSkill} onChange={handleSkillChange}>
                <option value="">Skills to Share</option>
                {skillsList.map(skill => (
                <option key={skill.id} value={skill.name}>{skill.name}</option>
                ))}
                </select>


                </div>
                <div className="sort">
                Sort By:
                    <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="desc">No of Skills Desc</option>
                    <option value="asc">No of Skills Asc</option>
                    </select>
                </div>
            </div>

            <div className="user-grid">
                {displayedUsers.filter(user => user.username !== 'admin').map(user => (
                    <div className="user-grid-item" key={user.id}>
                        <UserItem user={user} />
                        {userRole === 'admin' && (
                            <Link to={{ pathname: "/EditProfile", state: { user: user } }} className="button-link">
                                Edit
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

