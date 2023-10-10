import {Link, useMatch, useResolvedPath} from "react-router-dom"

export default function Navbar() {
    return (
        <nav className = "nav">
            <a href="/" className="site-title">
                SkillSync
            </a>
            <ul>
                <li>
                    <a href = "/Login">Log in/Register</a>
                </li>
            </ul>
        </nav>
    )
}