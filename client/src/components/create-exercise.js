import React, { Component } from 'react';
import axios from 'axios';
import storage from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeReference = this.onChangeReference.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.state = {
            name: '',
            description: '',
            reference: undefined
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeReference(url) {
        this.setState({
            reference: url
        });
    }

    /* Start of image upload procedure */
    uploadImage(file, url) {
        const storageRef = ref(storage, file.name)
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log("uploaded image");
            getDownloadURL(ref(storage, file.name)).then((u) => {
            url = u;
            this.onChangeReference(url);
        });
        });
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            name: this.state.name,
            description: this.state.description,
            reference: this.state.reference

        }
        console.log(exercise);

        axios.post('http://localhost:3001/exercises/add', exercise)
        .then(res => console.log(res.data));

        window.location = '/';
    }

render(){
    const url = '';
    return (
        <div>
      <h3>Add Exercise to Workouts</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group"> 
          <label>Reference: </label>
          <input  type="file"
              required
              className="form-control"
              onChange={(e) => this.uploadImage(e.target.files[0], url)}
              />
        </div>
        <div className="form-group">
          <input type="button" onClick={this.onSubmit} value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
}}
