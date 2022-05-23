import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Fitness</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/exercises" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/add" className="nav-link">Add Exercise</Link>
          </li>
          <li className="navbar-item">
          <Link to="/calculators" className="nav-link">Calculators</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}