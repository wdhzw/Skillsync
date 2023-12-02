import React, { useState, useEffect } from 'react';
// import pic from '../pic.jpg';
import graphQLFetch from './api';
import './Login.css';

const EditProfile = ({ user }) => {

const [newusername, setNewUsername] = useState('');
const [password, setPassword] = useState('');
const [age, setAge] = useState('');
const [gender, setGender]= useState('');
const [postcode, setPostcode] = useState('');
const [avatar, setAvatar] = useState(null);
const [errors, setErrors] = useState({});
const [isValidPassword, setValidPassword] = useState(true);
const [isValidPost, setValidPost] = useState(true);
const [isValidAge, setValidAge] = useState(true);

const [skills, setSkills] = useState([]);
const [selectedSkills, setSelectedSkills] = useState([{ id: 1, name: '', proficiency: 'beginner' }]);
const [interestedSkills, setInterestedSkills] = useState([]);
const [district, setDistrict] = useState('');
const avatarPath = undefined;

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

const username = user.username;

const formData = new FormData();

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    
    const value = event.target.value;
    const isValidPassword = value.length >= 6; 
    setValidPassword(isValidPassword);
    setPassword(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    
    const value = event.target.value;
    const isValidPost = value.length == 6; 
    setValidPost(isValidPost);
    setPostcode(event.target.value);
  };

  const handleGenderChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    const isValidAge = parseInt(value) <= 120; 
    setValidAge(isValidAge);
    const newValue = value.replace(/\D/g, '').slice(0, 3);
    setAge(newValue);
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


  const handleSave = async (event) => {
    event.preventDefault();
    validateForm();
    const transformedSkills = transformSkillsForSubmission();
    const transformedInterestedSkills = interestedSkills.filter(id => id !== '').map(Number);

    if (avatar) {
      console.log("avatar loading");
      const formData = new FormData();
      formData.append('avatar', avatar);
  
      try {
        const uploadResponse = await fetch('/upload-avatar', {
          method: 'POST',
          body: formData,
        });
        const uploadResult = await uploadResponse.json();
  
        if (uploadResponse.ok) {
          alert("upload avatar success!");
          avatarPath = uploadResult.path;
        } else {
          throw new Error('Failed to upload avatar.');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        return;
      }
    }
          
          const editProfileMutation = `
            mutation editProfile($username: String!, $newusername: String, $password: String, $gender: String,$profile:UserProfileInput) {
              editProfile(username:$username, newusername:$newusername, password:$password,gender:$gender,profile:$profile) {
                username
                password
                gender
                profile{
                  age
                  postal
                  location
                  avatar
                  skills{
                    skill_id
                    level
                  }
                  wanted_skills
                }
              }
            }`;
            
          const editData = {
            username: username,
            newusername: newusername,
            password: password,
            gender: gender,
            profile:{
              age: parseInt(age),
              location: district,
              postal: parseInt(postcode),
              avatar: avatarPath,
              skills: transformedSkills,
              wanted_skills:transformedInterestedSkills,
            },
          };
          console.log(editData); //success
          
          try {
            const data = await graphQLFetch(editProfileMutation, editData);
            if(data.editProfile){
              alert("Profile updated " + username);
            }
            console.log('Profile updated:', data);
          } catch (error) {
            console.error('Error updating profile:', error);
          }
        
      
  };

  const validateForm = () => {
    const errors = {};

    // Validate username
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    setErrors(errors);
  };


  return (
    <div className="register-wrapper">
      <h2>Edit Profile</h2>
      <div>
        <strong>Username: </strong>
        <input
          type="text"
          name="username"
          value={newusername}
          onChange={handleUsernameChange}
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>
      <div>
        <strong>Password: </strong>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
         {!isValidPassword && <p className="error-message">Password must be at least 6 characters long.</p>}
      </div>
      
      <div>
        <strong>Gender: </strong>
        <select id="gender" name="gender" onChange={handleGenderChange}>
                <option value="NA">-Select-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
        </select>
      </div>
      <div>
        <strong>Age: </strong>
        <input
          type="text"
          name="age"
          value={age}
          onChange={handleAgeChange}
        />
        {!isValidAge && <p className="error-message">Age must be a number less than 120</p>}
      </div>
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
              <option value=''>
                  No change
              </option>
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

      <div>
        <strong>Neighborhood: </strong>
        <input
          type="text"
          name="postcode"
          value={postcode}
          onChange={handlePostcodeChange}
        />
         {!isValidPost && <p className="error-message">Postcode must be 6 characters long.</p>}
     </div>

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
};

const getColorForSkill = (skill) => {
  switch (skill) {
    case 'React':
      return 'red';
    case 'JavaScript':
      return 'yellow';
    case 'CSS':
      return 'green';
    default:
      return 'black';
  }
};

export default EditProfile;
