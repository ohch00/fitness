import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import axios from 'axios';


const Workouts = props =>{

  const params = useParams();

    const auth = getAuth();
    const user = auth.currentUser;

    let navigate = useNavigate();

    const [name, setName] = useState('');
    
    useEffect(() => {
      if (!user){
        window.location = '/login';
        
      } 
    }, [])

    useEffect(() => {
      if (!user) {
        window.location = '/login';
      } else {
      axios.get('http://localhost:3001/exercises/'+params.id)
        .then(response => {
          setName(response.data.name);
          setDescription(response.data.description);
          setReference(response.data.reference);
          setPrevRef(response.data.reference);
        })
        .catch(function (error) {
          console.log(error);
        })
    }},  []);
    
    const onChangeName = e => {
      setName(e.target.value);
    }
  
    const onChangeDescription = e => {
      setDescription(e.target.value);
    }
  
    const onChangeReferenceImage = async e => {
      setReference(e);
      setFile(true);
      setUpdated(true);
    }
  
    const onChangeReferenceLink = e => {
      setReference(e.target.value);
      setUpdated(false);
    }
  
  const onSubmit = async e => {
    e.preventDefault();
  
    if (updatedImage === true){
      deleteImage(prevRef);
      let url = await uploadImage(reference);
  
      const exercise = {
        name: name,
        description: description,
        reference: url
    }
        console.log(exercise);
  
        axios.post('http://localhost:3001/exercises/update/' + params.id, exercise)
        .then(res => console.log(res.data));
  
        window.location = '/exercises';
    } else {
  
      deleteImage(prevRef);
  
    const exercise = {
        name: name,
        description: description,
        reference: reference
    }
    console.log(exercise);
  
    axios.post('http://localhost:3001/exercises/update/' + params.id, exercise)
    .then(res => console.log(res.data));
  
    window.location = '/exercises';
  }}
  
      return (
      <div>
        <h3>Edit Exercises</h3>
        <form onSubmit={onSubmit}>
        <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                className="form-control"
                value={name}
                onChange={(e) => onChangeName(e)}
                />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                className="form-control"
                value={description}
                onChange={(e) => onChangeDescription(e)}
                />
          </div>
          <div className="form-group"> 
            <label>Reference (Image Upload): </label>
            <input  type="file"
                className="form-control"
                onChange={(e) => onChangeReferenceImage(e.target.files[0])}
                />
          </div>
          {!isFile &&
          <div className="form-group"> 
            <label>Reference (Image Link): </label>
            <input  type="url"
              value={reference}
                className="form-control"
                onChange={(e) => onChangeReferenceLink(e)}
                />
          </div>
            }
            {isFile &&
          <div className="form-group"> 
            <label>Reference (Image Link): </label>
            <input  type="url"
                className="form-control"
                onChange={(e) => onChangeReferenceLink(e)}
                />
          </div>
            }
          <div className="form-group">
            <input type="submit" value="Edit Exercise" className="btn btn-primary" />
          </div>
        </form>
      </div>
      )
    }

export default Workouts;