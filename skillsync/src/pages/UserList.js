import React, { useState } from 'react';
import UserItem from '../components/UserItem.js';
import '../pages/UserList.css'; 
import SideNav from '../SideNav.js';

export default function UserList() {
    const [users, setUsers] = useState([ 
      {id: 1, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 2, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 3, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 4, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 5, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 6, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 7, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 8, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
      {id: 9, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
  ]);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const userRole = localStorage.getItem('userRole');

    function handleEditClick(user) {
        setEditingUser(user);
        setIsEditModalOpen(true);
    }

    function handleDelete(userId) {
        const newUsers = users.filter(user => user.id !== userId);
        setUsers(newUsers);
    }

    function handleSave(updatedUser) {
        const updatedUsers = users.map(user => {
            if (user.id === editingUser.id) {
                return { ...user, ...updatedUser, noofskills: updatedUser.skills.length };
            }
            return user;
        });
        setUsers(updatedUsers);
        setIsEditModalOpen(false);
    }

    return (
        <div className="userlist-wrapper">
            <SideNav />

            <h1>List of Users</h1>
            <div className="search">
                <input type="text" placeholder="Search by user name" />
            </div>

            <div className="user-grid">
                {
                    users.map(user => (
                        <div className="user-grid-item" key={user.id}>
                            <UserItem user={user} />
                            {userRole === 'admin' && (
                                <>
                                    <button className="edit" onClick={() => handleEditClick(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))
                }
            </div>

            {isEditModalOpen && (
                <EditModal user={editingUser} onSave={handleSave} onClose={() => setIsEditModalOpen(false)} />
            )}
        </div>
    );
}

function EditModal({ user, onClose, onSave }) {
    const [name, setName] = useState(user.name);
    const [location, setLocation] = useState(user.location);
    const [picture, setPicture] = useState(user.picture);
    const [skills, setSkills] = useState(user.skills.join(', '));

    const handleSaveClick = () => {
        const updatedSkills = skills.split(',').map(skill => skill.trim());
        onSave({ name, location, picture, skills: updatedSkills });
    };

    return (
        <div className="edit-modal">
            <h2>Edit User</h2>
            
            <label>Name: </label>
            <input value={name} onChange={e => setName(e.target.value)} />
            
            <label>Location: </label>
            <input value={location} onChange={e => setLocation(e.target.value)} />
            
            <label>Picture URL: </label>
            <input value={picture} onChange={e => setPicture(e.target.value)} />

            <label>Skills (comma-separated): </label>
            <textarea value={skills} onChange={e => setSkills(e.target.value)} />
            
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
