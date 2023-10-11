// import logo from './logo.svg';
import './App.css';
  
import Navbar from './Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import SideNav from './SideNav';

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
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />

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
