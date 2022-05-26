import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Workout = props => (
    <tr>
      <td>{props.workout.name}</td>
      <td>{props.workout.description}</td>
      <td><img src={props.workout.reference} alt=''></img></td>
      <td>
        <Link to={"/edit/"+props.workout._id}>edit</Link> | <a onClick={() => { props.deleteExercise(props.exercise._id, props.exercise.reference) }}>delete</a>
      </td>
    </tr>
  )

export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.deleteWorkout = this.deleteWorkout.bind(this);

        this.state = {workouts: []};
    }
    

    componentDidMount(){
        axios.get('http://localhost:3001/workouts/')
        .then(response => {
            this.setState({ exercises: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }


    deleteExercise(id, url) {
      this.deleteImage(url);

        axios.delete('http://localhost:3001/exercises/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      }
    
      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }
    


    render(){ return (
        <div>
        <h3>Workouts</h3>
        <Link to="/add">
          <button className='addExercise'>+ Add Exercise</button>
        </Link>
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
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    );
}}

