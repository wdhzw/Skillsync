import React from "react";
import { Link } from "react-router-dom";
import './SideNav.css'; 

const SideNav = () => {
    return (
        <div className="side-navbar">
        <Link to="/Register" className="nav-link">Register</Link>
        <Link to="/Login" className="nav-link">Login</Link>
        <Link to="/SkillList" className="nav-link">Skills</Link>
        <Link to="/UserList" className="nav-link">Users</Link>
        <Link to="/RecUserList" className="nav-link">Recommended Users</Link>
        <Link to="/Chats" className="nav-link">Chats</Link>
        <Link to="/Invitations" className="nav-link">Invitations</Link>
      </div>
    )
}

export default SideNav
