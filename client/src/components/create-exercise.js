import React, { Component } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";

c


export default class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            reference: null
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/users/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeReference(e) {
        this.setState({
            reference: e.target.files[0]
        });
    }

    onImageUpload() {

    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            reference: this.state.reference

        }
        console.log(exercise);

        axios.post('http://localhost:3001/exercises/add', exercise)
        .then(res => console.log(res.data));

        window.location = '/';
    }

render(){
    return (
        <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
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
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        
        
        <div className="form-group">
          <input type="button" onClick={this.onSubmit} value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
}}
