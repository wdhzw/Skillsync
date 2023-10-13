import React, { useState, useEffect } from 'react';
import '../pages/SkillDetails.css'; 
import SideNav from '../SideNav.js';
import UserItem from '../components/UserItem.js';
//import axios from "axios";


export default function SkillDetails() {
const skilldetails = [ 
  {id: 1, name: 'Database Design', picture:'/images/skillavatar.png',description:'Database Design is a critical skill encompassing the methodical creation and management of databases to ensure that they effectively support the applications and services that utilize them. It involves constructing a structured framework to accurately store, manage, and retrieve data.'},
];

const userswithskill = [ 
  {id: 1, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
  {id: 2, name: 'Mary Lim', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
  {id: 3, name: 'John Ng', location:'Hougang',noofskills:8,picture:'/images/avatar.png',skills:['programming','golf','cooking','database design','French']},
];

/*

    const [ssgData, setssgData] = useState({});
    const ssgAPIURL = "https://public-api.ssg-wsg.sg/courses/directory";


    const getSSGToken = async () => {
      try{
      const id = 'tofill';
      const secret = 'tofill';
      const credentials = btoa('${id}:${secret}');

      const response = await axios.post('https://public-api.ssg-wsg.sg/dp-oauth/oauth/token', 
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': 'Basic ${credentials}',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      );
      return response.data.access_token;
      }
      catch (error) {
        console.error('Error getting token');
      }
    };


    const getSSGDatafromAPI = async () => {
      try{

      const token= await getSSGToken();  
      
        const response = await axios.get(ssgAPIURL, {
          headers: {
            Authorization: 'Bearer ${token}'
          },
          params: {
            pageSize: 9,
            page: 0,
            keyword: skilldetails[0].name  
          } 
        });

      setssgData(response.data);
      }
      catch (error) {
        console.error('Error');
      }
    };
    
    useEffect(() => {
      getSSGDatafromAPI();
      console.log(ssgData);
    }, []);


*/

      return (
        <div className="skills-wrapper">
        <SideNav/>
          <h1>{skilldetails[0].name}</h1>
          <div className="skill-details">
            <img src={skilldetails[0].picture} width="50" height="50" />
            <p>{skilldetails[0].description}</p>
          </div>

          <h1>List of Users with the Skill</h1>

          <div className="user-grid">
            {
              userswithskill.map(function(user) {
                return (
                  <div className="user-grid-item">
                    <UserItem user={user} />
                  </div>
                );
              })
            }
          </div>

          <h1>Courses to help you learn the skill</h1>
          <div className="skillsfuture">
          <p>External data pulled from SkillsFuture</p>


          </div>


        </div>
      );
        
  }