// import logo from './logo.svg';
import './App.css';

import Navbar from './Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
      <Register/>
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
