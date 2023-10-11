import {Link, useMatch, useResolvedPath} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className = "nav">
            <a href="/" className="site-title">
                SkillSync
            </a>
            <ul>
                <li>
                    <Link to="/ViewProfile" className="nav-link">ViewProfile</Link>
                </li>
            </ul>
        </nav>
    )
}