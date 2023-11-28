import React, { useState } from 'react';
import pic from '../pic.jpg';

const EditProfile = ({ user }) => {
  // const [user, setUser] = useState('');
//     username: 'JohnDoe',
//     gender: 'Male',
//     age: '21',
//     skills: ['React', 'JavaScript', 'CSS'],
//     interested:['Swimming','Soccer'],
//     neighborhood: 'Sample Neighborhood',
//     avatarUrl: '',
// });
  const setUser = (newuser) => {
    user = newuser;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Implement save functionality here (e.g., make API request to save the updated profile)
    console.log('Profile saved:', user);
  };

  return (
    <div className="register-wrapper">
      <h2>Edit Profile</h2>
      <div>
        <strong>Username: </strong>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <strong>Gender: </strong>
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <strong>Age: </strong>
        <input
          type="text"
          name="age"
          value={user.age}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <strong>Skills: </strong>
        <div>
          {/* {user.userskill.map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: getColorForSkill(skill),
                color: 'white',
                padding: '4px',
                margin: '2px',
                display: 'inline-block',
                borderRadius: '4px',
              }}
            >
              {skill}
            </div>
          ))} */}
        </div>
      </div>
      
      <div>
        <strong>Interests: </strong>
        <div>
          {/* {user.wantedskill.map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: getColorForSkill(skill),
                color: 'white',
                padding: '4px',
                margin: '2px',
                display: 'inline-block',
                borderRadius: '4px',
              }}
            >
              {skill}
            </div>
          ))} */}
        </div>
      </div>

      <div>
        <strong>Avatar: </strong>
        <img src={pic} className="App-logo" alt="logo" />
        <input type="file" id="avatar" name="avatar"/>
      </div>
      <div>
        <strong>Neighborhood: </strong>
        <input
          type="text"
          name="neighborhood"
          value={user.postcode}
          onChange={handleInputChange}
        />
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
