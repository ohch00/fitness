import React, { useEffect, useState, setState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { getAuth } from "firebase/auth";

import Navbar from "./components/navbar.js";
import HomePage from "./views/homepage.js";
import ExercisesList from "./views/exercises-list.js";
import EditExercise from "./components/edit-exercise.js";
import CreateExercise from "./components/create-exercise.js";
import Calculators from "./views/calculators.js";
import Login from "./components/login.js"
import Registration from "./components/registration.js";
import LogOut from "./components/logout";

function App() {
  const [data, setData] = React.useState(null);

  const auth = getAuth();
  const firebaseUser = auth.currentUser;
  console.log(auth, firebaseUser);


  return (
    <Router>
      <div className="container">
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/exercises" element={<ExercisesList/>} />
        <Route path="/edit/:id" element={<EditExercise/>} />
        <Route path="/add" element={<CreateExercise/>} />
        <Route path="/calculators" element={<Calculators/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/logout" element={<LogOut/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
