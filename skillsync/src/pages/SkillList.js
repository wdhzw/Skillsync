import React, { useState } from 'react';
import SkillItem from '../components/SkillItem.js';
import '../pages/SkillList.css'; 
import SideNav from '../SideNav.js';

export default function SkillList() {
  const [skills, setSkills] = useState([ 
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
  ])
    const [editingSkill, setEditingSkill] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const userRole = localStorage.getItem('userRole');

    function handleEditClick(skill) {
        setEditingSkill(skill);
        setIsEditModalOpen(true);
    }

    function handleDelete(skillId) {
        const newSkills = skills.filter(skill => skill.id !== skillId);
        setSkills(newSkills);
    }

    function handleSave(name) {
        // Update the skill in the skills array with the new name
        const updatedSkills = skills.map(skill => {
            if (skill.id === editingSkill.id) {
                return { ...skill, name: name };
            }
            return skill;
        });
        setSkills(updatedSkills);
        setIsEditModalOpen(false);
    }

    return (
        <div className="skilllist-wrapper">
            <SideNav />

            <h1>List of Skills</h1>
            <div className="search">
                <input type="text" placeholder="Search by skill name" />
            </div>

            <div className="skill-grid">
                {
                    skills.map(skill => (
                        <div className="skill-grid-item" key={skill.id}>
                            <SkillItem skill={skill} />
                            {userRole === 'admin' && (
                                <>
                                    <button onClick={() => handleEditClick(skill)}>Edit</button>
                                    <button onClick={() => handleDelete(skill.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))
                }
            </div>

            {isEditModalOpen && (
                <EditModal skill={editingSkill} onSave={handleSave} onClose={() => setIsEditModalOpen(false)} />
            )}
        </div>
    );
}

function EditModal({ skill, onClose, onSave }) {
    const [name, setName] = useState(skill.name);

    return (
        <div className="edit-modal">
            <h2>Edit Skill</h2>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => onSave(name)}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
