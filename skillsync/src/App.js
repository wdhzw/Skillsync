// import logo from './logo.svg';
import './App.css';
  
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


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/RecUserList" element={<RecUserList />} />
          <Route path="/SkillList" element={<SkillList />} />
          <Route path="/SkillDetails" element={<SkillDetails />} />

          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ViewProfile" element={<ViewProfile />} />
          <Route path="/Chats" element={<Chats />} />
        </Routes>
        <SideNav />
      </Router>

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
