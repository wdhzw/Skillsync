import React, { useState , useEffect  } from 'react';
import './Login.css';
import SideNav from '../SideNav';
import {Link, useLocation,useNavigate} from "react-router-dom";
import MapContainer from './MapContainer';
import graphQLFetch from './api';

const Profile = ({ user }) => {
  
  const navigate = useNavigate();

  if(user) {
    alert("You are already logged in. Bringing you to your Profile page");
    navigate("/ViewProfile");
    return null;
  } 

  };

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender]= useState('');
  const [postcode, setPostcode] = useState('');
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([{ id: 1, name: '', proficiency: 'beginner' }]);
  const [interestedSkills, setInterestedSkills] = useState([]);
  const [district, setDistrict] = useState('');

  const districts = [
    "Ang Mo Kio", "Bedok", "Bishan", "Bukit Batok", "Bukit Merah",
    "Choa Chu Kang", "Clementi", "Geylang", "Hougang", "Jurong East",
    "Jurong West", "Kallang", "Marine Parade", "Orchard", "Pasir Ris",
    "Punggol", "Queenstown", "Sembawang", "Sengkang", "Serangoon",
    "Tampines", "Toa Payoh", "Woodlands", "Yishun", "Jurong",
    "Bukit Timah", "Novena", "Tanglin", "Rochor"];
  

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

  const handleAddSkill = () => {
    setSelectedSkills([...selectedSkills, { id: 1, name: '', proficiency: 'beginner' }]);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };

  const handleGenderChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };


  const handleAgeChange = (event) => {
    const value = event.target.value;
    const newValue = value.replace(/\D/g, '').slice(0, 3);
    setAge(newValue);
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleProficiencyChange = (index, proficiency) => {
    setSelectedSkills((prevSelectedSkills) => {
      const updatedSkills = [...prevSelectedSkills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        proficiency: proficiency,
      };
      return updatedSkills;
    });
  };

  const handleSkillNameChange = (index, skillName) => {
    setSelectedSkills(prevSelectedSkills => {
      const updatedSkills = [...prevSelectedSkills];
      if (skillName === '') {
        updatedSkills[index] = { ...updatedSkills[index], id: 1, name: '' };
      } else {
        const foundSkill = skills.find(s => s.name === skillName);
        updatedSkills[index] = {
          ...updatedSkills[index],
          id: foundSkill ? parseInt(foundSkill.id) : null,
          name: skillName,
        };
      }
      return updatedSkills;
    });
  };
  
  const transformSkillsForSubmission = () => {
    return selectedSkills.map(skill => {
      return { skill_id: skill.id, level: skill.proficiency };
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    console.log("form submitting");

    if (Object.keys(formErrors).length !== 0) {
      alert("Please fill in the fields according to the requirements!");
      return; // Stop the form submission
    }
  
    console.log("no errors found");

    console.log(avatar);

    const transformedSkills = transformSkillsForSubmission();
    const transformedInterestedSkills = interestedSkills.filter(id => id !== '').map(Number);

    if (avatar) {
      console.log("avatar loading");
      const formData = new FormData();
      formData.append('avatar', avatar);
  
      try {
        const uploadResponse = await fetch('http://localhost:8000/upload-avatar', {
          method: 'POST',
          body: formData,
        });
        const uploadResult = await uploadResponse.json();

        if (uploadResponse.ok) {
          const avatarPath = uploadResult.path;

                      const registerData = {
                        username: username,
                        password: password,
                        gender: gender,
                        profile: {
                          age: parseInt(age),
                          postal: parseInt(postcode),
                          location: district,
                          avatar: avatarPath, 
                          skills: transformedSkills,
                          wanted_skills: transformedInterestedSkills
                    }
                      };
                  
                      const registerMutation = `
                      mutation register($username: String!, $password: String!, $gender: String!, $profile: UserProfileInput) {
                        register(username: $username, password: $password, gender: $gender, profile: $profile) {
                          username
                          password
                          gender
                          profile {
                            age
                            postal
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
                  
                      console.log(registerData); //success
                    
                      try {
                        const data = await graphQLFetch(registerMutation, registerData);
                        if(data.register){
                          alert("User signed up with username " + username);
                        }
                        console.log('User signed up:', data);
                        console.log(skills);
                      } catch (error) {
                        console.error('Error signing up:', error);
                      }


        } else {
          throw new Error('Failed to upload avatar.');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        return;
      }
    }
  


    
  };

  const validateForm = () => {
    const errors = {};

    // Validate username
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    // Validate password length
    if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }
    if (postcode.length != 6) {
      errors.postcode = 'Postcode should be at 6 digits';
    }
    // Validate age
    if (parseInt(age) > 120) {
      errors.age = 'Age must be a number less than 120';
    }
    return errors;

  };

  const handleAddInterestedSkill = () => {
    setInterestedSkills([...interestedSkills, '']); // Adds an empty placeholder for a new skill
};

const handleInterestedSkillChange = (index, newSkillId) => {
  setInterestedSkills(interestedSkills.map((skillId, idx) => idx === index ? newSkillId : skillId));
};

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  return(
    <div className="register-wrapper">
      <SideNav/>
      <h1>Welcome to SkillSync!</h1>
      <h3>Registration</h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          <p>Username</p>
          <input type="text" value={username} onChange={handleUsernameChange} required/>
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={handlePasswordChange} required/>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
       </label>
        <label>
          <p>Age</p>
          <input type="age" value={age} onChange={handleAgeChange} required/>
          {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
        </label>

        <label>
            <p>Gender</p>
            <select id="gender" name="gender" onChange={handleGenderChange}>
                <option value="NA">-Select-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </label>

        <label htmlFor="avatar">
            <p>Avatar</p>
        </label>
        <input type="file" id="avatar" name="avatar" onChange={handleInputChange} /><br />

        <div>
          <p>Confident skills</p>
          {selectedSkills.map((skill,index) => (
            <div key={index}>
            <select
              className="skill"
              name="skill"
              value={skill.name}
              onChange={(e) => handleSkillNameChange(index, e.target.value)}
            >
              {skills.map((optionSkill) => (
                <option key={optionSkill.id} value={optionSkill.name}>
                  {optionSkill.name}
                </option>
              ))}
            </select>

              <select
                className="proficiency"
                name="proficiency"
                value={skill.proficiency}
                onChange={(e) => handleProficiencyChange(index, e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          ))}
          <button onClick={handleAddSkill}> + </button>
    </div>

    <label>
    <p>Interested skills</p>
    {interestedSkills.map((skillId, index) => (
        <div key={index}>
            <select
                value={skillId}
                onChange={(e) => handleInterestedSkillChange(index, e.target.value)}
                className="skill"
            >
                <option value="">Select a Skill</option>
                {skills.map((optionSkill) => (
                    <option key={optionSkill.id} value={optionSkill.id}>
                        {optionSkill.name}
                    </option>
                ))}
            </select>
        </div>
    ))}
    <button type="button" onClick={handleAddInterestedSkill}>+</button>
</label>


    <label htmlFor="district">
          <p>District</p>
          <select 
            id="district" 
            value={district} 
            onChange={handleDistrictChange} 
            required
          >
            <option value="">Select a District</option>
            {districts.map((d, index) => (
              <option key={index} value={d}>{d}</option>
            ))}
          </select>
        </label>




        <label htmlFor="postalCode">
            <p>Postal Code</p>
        </label>
        <input type="postcode" value={postcode} onChange={handlePostcodeChange} required/>
          {errors.postcode && <span style={{ color: 'red' }}>{errors.postcode}</span>}
       <MapContainer/>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
export default Register;