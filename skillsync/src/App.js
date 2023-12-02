// import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './AuthContext.js';
import React, { useState } from 'react';

import Navbar from './Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import SideNav from './SideNav';
import ViewProfile from './pages/ViewProfile';
import RecUserList from './pages/RecUserList';
import SkillList from './pages/SkillList';
import Invitations from './pages/Invitations';
import Chats from './pages/Chats';
import SkillDetails from './pages/SkillDetails';
import EditProfile from './pages/EditProfile';
import graphQLFetch from './pages/api';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

function MainContent() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const handleUser = async (loggedInUser) => {
    setLoggedInUser(loggedInUser);
  };

  return (
    <div className="main-content">
        <Routes>
          <Route path="/" element={<Login onLogin={handleUser}/>} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/RecUserList" element={<RecUserList />} />
          <Route path="/SkillList" element={<SkillList />} />
          <Route path="/SkillDetails/:id" element={<SkillDetails />} /> {}

          <Route path="/Invitations" element={<Invitations />} />

          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login onLogin={handleUser}/>} />
          <Route path="/ViewProfile" element={<ViewProfile user={loggedInUser}/>} />
          <Route path="/EditProfile" element={<EditProfile user={loggedInUser}/>} />
          <Route path="/Chats" element={<Chats />} />
        </Routes>
    </div>
  );
}



function App() {
  return (
    <>
    <AuthProvider>
         <Router>
        <Navbar />
        <MainContent />
        <SideNav />
      </Router>   
    </AuthProvider>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Welcome to SkillSync!
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Log in/register
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
