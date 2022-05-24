import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ref, deleteObject, getStorage } from "firebase/storage";


const Exercise = props => (
    <tr>
      <td>{props.exercise.name}</td>
      <td>{props.exercise.description}</td>
      <td><img src={props.exercise.reference} alt=''></img></td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id, props.exercise.reference) }}>delete</a>
      </td>
    </tr>
  )

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
    


    render(){return (
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
              <th>Reference</th>
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

