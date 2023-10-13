import {Link, useMatch, useResolvedPath} from "react-router-dom";
import PortraitIcon from '@mui/icons-material/Portrait';

export default function Navbar() {
    return (
        <nav className = "nav">
            <a href="/" className="site-title">
                SkillSync
            </a>
            <ul>
                <li>
                    <PortraitIcon className="icon"/>
                    <Link to="/ViewProfile" className="nav-link">ViewProfile</Link>
                </li>
            </ul>
        </nav>
    )
}