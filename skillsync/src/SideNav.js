import React from "react";
import { Link } from "react-router-dom";
import './SideNav.css'; 
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

const SideNav = () => {
    return (
        <div className="side-navbar">
          <Link to="/Register" className="nav-link">
            <HowToRegIcon className="icon"/>
            Register
          </Link>
          <Link to="/Login" className="nav-link">
            <LoginIcon className="icon"/>
            Login
          </Link>
          <Link to="/SkillList" className="nav-link">
            <ListAltIcon className="icon"/>
            Skills</Link>
          <Link to="/SkillDetails" className="nav-link">
            <ListAltIcon className="icon"/>
            Individual Skill</Link>
          <Link to="/UserList" className="nav-link">
            <PeopleIcon className="icon"/>
            Users</Link>
          <Link to="/RecUserList" className="nav-link">Recommended Users</Link>
          <Link to="/Chats" className="nav-link">
            <ChatIcon className="icon"/>
            Chats</Link>
          <Link to="/Invitations" className="nav-link">
            <InsertInvitationIcon className="icon"/>
            Invitations</Link>
      </div>
    )
}

export default SideNav
