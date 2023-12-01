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
  const [courses, setCourses] = useState([]); // State to store courses


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


  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/skillsfuture?keyword=${encodeURIComponent(skill.name)}`);
        const data = await response.json();
        
        if (data && data.data && data.data.courses) {
          console.log("set courses success");
          setCourses(data.data.courses);
          console.log(data.data.courses);
        } else {
          console.log("set courses fail");
          setCourses([]); // Set an empty array if the data is not as expected
        }
        
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    if (skill && skill.name) {
      fetchCourses();
    }
  }, [skill]);

  if (!skill) {
    return <p>Loading skill details...</p>;
  }













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

          <h1>Courses Pulled from SkillsFuture to help you learn the skill</h1>
          <div className="skillsfuture">
          <p>External data pulled from SkillsFuture</p>
            <div className="courses-grid">
            {courses.map((course, index) => (
            <CourseItem 
              key={index}
              image={course.detailImageURL}
              title={course.title}
              content={course.content}
              provider={course.trainingProviderAlias}

            />

            ))}
            </div>
          </div>


          

        </div>
      );
        
  }