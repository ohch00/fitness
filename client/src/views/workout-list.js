import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from "../firebaseConfig";


const Workout = props => {
  
  const user = auth.currentUser; 

    return(
    <tr>
      <td>{props.workout.exercise.name}</td>
      <td>{props.workout.reps}</td>
      <td>{props.workout.sets}</td>
      <td>{props.workout.date.substring(0,10)}</td>
      <td>
      <Link to={"/edit/"+props.workout._id}>edit</Link> | 
      <Link to={"/delete/"+props.workout._id}>delete</Link> 
    
      </td>
    </tr>
  )
}

export default class WorkoutList extends Component{

    constructor(props){

        super(props);
        this.deleteWorkout = this.deleteWorkout.bind(this);

        this.state = {workouts: []};

        this.user = auth.currentUser;
        if (this.user){
          this.user = auth.currentUser.email;
        }
    }

    

    componentDidMount(){
        axios.get('http://localhost:3001/workouts/' + this.user)
        .then(response => {
            this.setState({ workouts: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }


    deleteWorkout(id) {

        axios.delete('http://localhost:3001/workouts/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          workouts: this.state.workouts.filter(el => el._id !== id)
        })
      }
    
      workoutList() {
        return this.state.workouts.map(currentworkout => {
          return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id}/>;
        })
      }
    


    render(){ 

      if (!this.user){
        return (
          <h1>Please log in to see your workouts.</h1>
        )
      } else {
      
      return (
      
        <div>
        <h3>Workouts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workouts</th>
              <th>Reps</th>
              <th>Sets</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.workoutList() }
          </tbody>
        </table>
      </div>
    )};
}}
