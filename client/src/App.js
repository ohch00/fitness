import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Navbar from "./components/navbar.js";
import HomePage from "./views/homepage.js";
import ExercisesList from "./views/exercises-list.js";
import EditExercise from "./components/edit-exercise.js";
import CreateExercise from "./components/create-exercise.js";
import Calculators from "./views/calculators.js";
import Login from "./components/login.js"
import Registration from "./components/registration.js";
import LogOut from "./components/logout";
import WorkoutList from "./views/workout-list.js"
import EditWorkout from "./components/edit-workout"

function App() {
  const [data, setData] = React.useState(null);
  const [signin, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user);
  } 
});

  return (
    <Router>
      <div className="container">
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/exercises" element={<ExercisesList/>} />
        <Route path="/edit/:id" element={<EditExercise/>} />
        <Route path="/add" element={<CreateExercise/>} />
        <Route path="/all-workouts" element={<WorkoutList/>} />
        <Route path="/edit/:id" element={<EditWorkout/>} />
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
