import React from "react";
import { Link } from "react-router-dom";
import './SideNav.css'; 
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AssistantIcon from '@mui/icons-material/Assistant';

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

          <Link to="/UserList" className="nav-link">
            <PeopleIcon className="icon"/>
            Users</Link>
          <Link to="/RecUserList" className="nav-link">
            <AssistantIcon className="icon"/>
            Recommended Users</Link>
          <Link to="/Chats" className="nav-link">
            <ChatIcon className="icon"/>
            Chats</Link>

      </div>
    )
}

export default SideNav
