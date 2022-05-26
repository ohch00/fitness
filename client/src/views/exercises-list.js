import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ref, deleteObject, getStorage } from "firebase/storage";
import { auth } from "../firebaseConfig";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import "../styles/exercises-list.css"

const Exercise = props => {
  const user = auth.currentUser; 

  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://use.typekit.net/foobar.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const addToWorkout = (e) => {
    e.preventDefault();
  }

  const onChangeReps = (e) => {
    setReps(e.target.value)
  }

  const onChangeSets = (e) => {
    setSets(e.target.value)
  }

  const onChangeDuration = (e) => {
    setDuration(e.target.value)
  }

  const onChangeDate = (date) => {
    setDate(date)
  }

  return(
    <tr>
      <td>{props.exercise.name}</td>
      <td>{props.exercise.description}</td>
      <td><img src={props.exercise.reference} alt=''></img></td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | 
        <a onClick={() => { props.deleteExercise(props.exercise._id, props.exercise.reference) }}> delete</a>
        {user && <><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">+</button>
        <div class="collapse" id="collapseExample">
  <div class="card card-body">
        <form onSubmit={addToWorkout}>
      <div className="form-group"> 
          <label>Reps: </label>
          <input  type="text"
              className="form-control"
              value={reps}
              onChange={(e) => onChangeReps(e)}
              />
        </div>
        <div className="form-group"> 
          <label>Sets: </label>
          <input  type="text"
              className="form-control"
              value={sets}
              onChange={(e) => onChangeSets(e)}
              />
        </div>
        <div className="form-group"> 
          <label>Duration: </label>
          <input  type="text"
              className="form-control"
              value={duration}
              onChange={(e) => onChangeDuration(e)}
              />
        </div>
        <div className="form-group"> 
          <label>Date: </label>
          <div>
            <DatePicker required selected={date} onChange={(e) => onChangeDate(e)}></DatePicker>
          </div>
        </div>
        <br></br>
        <div className="form-group">
          <input type="submit" value="Add to Workouts" className="btn btn-primary" />
        </div>
      </form>
      </div>
      </div></>}
      </td>
    </tr>
  )
}

export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.getFileFromURL = this.getFileFromURL.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.state = {exercises: []};
    }
    

    componentDidMount(){
        axios.get('http://localhost:3001/exercises/')
        .then(response => {
            this.setState({ exercises: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // https://stackoverflow.com/questions/45045054/how-to-call-reffromurl-in-firebase-cloud-function
 getFileFromURL(fileURL) {
  const fSlashes = fileURL.split('/');
  const fQuery = fSlashes[fSlashes.length - 1].split('?');
  const segments = fQuery[0].split('%2F');
  const fileName = segments.join('/');

  return fileName;
}

 deleteImage (url) {
    
  var filename = this.getFileFromURL(url);
  var deleteStorage = getStorage();
  var imageRef = ref(deleteStorage, filename);
    return new Promise(function(resolve, reject){
    deleteObject(imageRef).then(() => {
      resolve(console.log('deleted image from firebase'));
    }).catch((error) => {

    });
  })}

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
        <h3>Exercises</h3>
        <Link to="/add">
          <button className='addExercise'>+ Add Exercise</button>
        </Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Reference Picture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
}}

