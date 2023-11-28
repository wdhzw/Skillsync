import React, { useState, useEffect } from 'react';
import SkillItem from '../components/SkillItem.js';
import '../pages/SkillList.css'; 
import SideNav from '../SideNav.js';
import graphQLFetch from './api';
import { Link } from 'react-router-dom'; 


export default function SkillList() {
    const [skills, setSkills] = useState([]);
    const [editingSkill, setEditingSkill] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const userRole = localStorage.getItem('userRole');
    const [searchTerm, setSearchTerm] = useState('');

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
                setSkills(data.getAllSkills);
            }
        };

        fetchSkills();
    }, []); 

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const displayedSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );


    return (
        <div className="skilllist-wrapper">
            <SideNav />

            <h1>List of Skills</h1>
            <div className="search">
                <input type="text" placeholder="Search by skill name" value={searchTerm} onChange={handleSearchChange}/>
            </div>

            <div className="skill-grid">
                {
                    displayedSkills.map(skill => (
                        <div className="skill-grid-item" key={skill.id}>
                        <Link to={{
                            pathname: `/SkillDetails/${skill.id}`, 
                            state: { skill } 
                        }}>

                            <SkillItem skill={skill} />
                        </Link>
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
    const [picture, setPicture] = useState(skill.pic);

    return (
        <div className="edit-modal">
            <h2>Edit Skill</h2>
            <label>Name: </label>
            <input value={name} onChange={e => setName(e.target.value)} />
            <label>Picture URL: </label>
            <input value={picture} onChange={e => setPicture(e.target.value)} />
            <button onClick={() => onSave(name)}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
