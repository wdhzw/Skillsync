import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../pages/SkillDetails.css'; 
import SideNav from '../SideNav.js';
import CourseItem from '../components/CourseItem.js';
import UserItem from '../components/UserItem.js';
import JobItem from '../components/JobItem.js';
import graphQLFetch from './api';


export default function SkillDetails() {
  const { id } = useParams(); // Get the skill ID from the URL
  const location = useLocation();
  const [skill, setSkill] = useState(location.state?.skill || null);
  const [usersWithSkill, setUsersWithSkill] = useState([]);


  useEffect(() => {
    if (!skill) {
      const fetchSkill = async () => {
        const query = `query {
          getSkill(id: "${id}") {
            id
            name
            description
            pic
          }
        }`;
        const data = await graphQLFetch(query);
        if (data && data.getSkill) {
          setSkill(data.getSkill);
        }
      };

      fetchSkill();
    }
  }, [id, skill]);


  useEffect(() => {
    const fetchUsersBySkill = async () => {
      const query = `query {
        usersBySkill(skillId: ${id}) {
          id
          username
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
      }`;
      const data = await graphQLFetch(query);
      if (data && data.usersBySkill) {
        setUsersWithSkill(data.usersBySkill);
      }
    };

      fetchUsersBySkill();
  }, [id]);

  if (!skill) {
    return <p>Loading skill details...</p>;
  }


const courses = [ 
  {id: 1, name: 'Database for Dummies', provider:'National University of Singapore', picture:'/images/coursethumb.jpg', description:'With the advent of digitalization of functions in organizations, increasingly more and more digital data are created and stored. Data is now the oil that drives organizational business intelligence for greater value. It is collected, stored, extracted, analysed and reported. Traditionally, database systems have been used to store them for these purposes. With the advancement in database technologies'},
  {id: 2, name: 'Database for Dummies', provider:'National University of Singapore', picture:'/images/coursethumb.jpg', description:'With the advent of digitalization of functions in organizations, increasingly more and more digital data are created and stored. Data is now the oil that drives organizational business intelligence for greater value. It is collected, stored, extracted, analysed and reported. Traditionally, database systems have been used to store them for these purposes. With the advancement in database technologies'},
  {id: 3, name: 'Database for Dummies', provider:'National University of Singapore', picture:'/images/coursethumb.jpg', description:'With the advent of digitalization of functions in organizations, increasingly more and more digital data are created and stored. Data is now the oil that drives organizational business intelligence for greater value. It is collected, stored, extracted, analysed and reported. Traditionally, database systems have been used to store them for these purposes. With the advancement in database technologies'},
];

/*
const jobs = [ 
  {id: 1, name: 'Database Analyst', employer:'Google', emppicture:'/images/empthumb.PNG', description:'This role is in the data science division of Google Singapore. The role focuses on analytics to improve the range of Google Dashboards in SouthEast Asia.'},
  {id: 2, name: 'Database Analyst', employer:'Google', emppicture:'/images/empthumb.PNG', description:'This role is in the data science division of Google Singapore. The role focuses on analytics to improve the range of Google Dashboards in SouthEast Asia.'},
  {id: 3, name: 'Database Analyst', employer:'Google', emppicture:'/images/empthumb.PNG', description:'This role is in the data science division of Google Singapore. The role focuses on analytics to improve the range of Google Dashboards in SouthEast Asia.'},
];

          <h1>Jobs to take with this skill</h1>
          <div className="skillsfuture">
          <p>External data pulled from SkillsFuture</p>

          <div className="jobs-grid">
            {
              jobs.map(function(job) {
                return (
                    <JobItem job={job} />
                );
              })
            }
          </div>
          
          </div>
*/

      return (
        <div className="skills-wrapper">
        <SideNav/>
            <h1>{skill.name}</h1>
            <div className="skill-details">
                <img src={skill.pic} alt={skill.name} width="50" height="50" />
                <p>{skill.description}</p>
            </div>

          <h1>List of Users with the Skill</h1>
          <div className="user-grid">
          {usersWithSkill.map(user => (
          <div key={user.id} className="user-grid-item">
          <UserItem user={user} />
          </div>
          ))}
          </div>

          <h1>Courses to help you learn the skill</h1>
          <div className="skillsfuture">
          <p>External data pulled from SkillsFuture</p>

          <div className="courses-grid">
            {
              courses.map(function(course) {
                return (
                    <CourseItem course={course} />
                );
              })
            }
          </div>

          </div>

          

        </div>
      );
        
  }