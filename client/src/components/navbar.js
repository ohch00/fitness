import React, {  } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";


const Navbar = props => {

  const auth = getAuth();
  const user = auth.currentUser;
  
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Fitness</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/today" className="nav-link">Today's Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/week" className="nav-link">Weekly Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/exercises" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/calculators" className="nav-link">Calculators</Link>
          </li>
          {user && <li className="navbar-item">
          <Link to="/logout" className="nav-link">Log Out</Link>
          </li>}
          {!user &&
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login/Register</Link>
          </li> }
        </ul>
        </div>
      </nav>
    );
  }


export default Navbar;