import React, { Component } from 'react';
import axios from 'axios';
import storage from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeReferencePhoto = this.onChangeReferencePhoto.bind(this);
        this.onChangeReferenceLink = this.onChangeReferenceLink.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.state = {
            name: '',
            description: '',
            reference: undefined,
            isUpload: false
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

    onChangeReferencePhoto(e) {
        this.setState({
            reference: e,
            isUpload: true
        });
        
    }

    onChangeReferenceLink(e) {
        this.setState({
            reference: e.target.value
        });
        
    }



    /* Start of image upload procedure */
    async uploadImage(file) {
        const storageRef = ref(storage, file.name)
        return new Promise(function (resolve, reject) {
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log("uploaded image");
            getDownloadURL(ref(storage, file.name)).then((url) => {
                resolve(url);
                    });
        });
        }
    )}

    async onSubmit(e){
        e.preventDefault();

        if (this.state.isUpload){
            let url = await this.uploadImage(this.state.reference);
            const exercise = {
                name: this.state.name,
                description: this.state.description,
                reference: url
    
            }

            console.log(exercise);
    
            axios.post('http://localhost:3001/exercises/add', exercise)
            .then(res => console.log(res.data));
    
            window.location = '/exercises';
        } else {

        const exercise = {
            name: this.state.name,
            description: this.state.description,
            reference: this.state.reference

        }
        console.log(exercise);

        axios.post('http://localhost:3001/exercises/add', exercise)
        .then(res => console.log(res.data));

        window.location = '/exercises';
    }}

render(){
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
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group"> 
          <label>Reference (Photo Upload): </label>
          <input  type="file"
              className="form-control"
              onChange={(e) => this.onChangeReferencePhoto(e.target.files[0])}
              />
        </div>
        <h5> or </h5>
        <div className="form-group"> 
          <label>Reference (Image Link): </label>
          <input  type="link"
              className="form-control"
              onChange={this.onChangeReferenceLink}
              />
        </div>
        <br></br>
        <div className="form-group">
          <input type="button" onClick={this.onSubmit} value="Add Exercise" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
}}
