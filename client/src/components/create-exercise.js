import React, { useState, useContext } from 'react';
import axios from 'axios';
import { storage } from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateExercise = props => {

    const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState(undefined);
  const [isUpload, setIsUpload] = useState(false);


    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeReferencePhoto = (e) => {
        setReference(e);
        setIsUpload(true);
        
    }

    const onChangeReferenceLink = (e) => {
        setReference(e.target.value);
        setIsUpload(false);
        
    }

    /* Start of image upload procedure */
    const uploadImage = async file => {
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

    const onSubmit = async e => {
        e.preventDefault();

        if (isUpload){
            let url = await uploadImage(reference);
            const exercise = {
                name: name,
                description: description,
                reference: url
    
            }

            console.log(exercise);
    
            axios.post('http://localhost:3001/exercises/add', exercise)
            .then(res => console.log(res.data));
    
            window.location = '/exercises';
        } else {

        const exercise = {
            name: name,
            description: description,
            reference: reference

        }
        console.log(exercise);

        axios.post('http://localhost:3001/exercises/add', exercise)
        .then(res => console.log(res.data));

        window.location = '/exercises';
    }}

    return (
        <div>
      <h3>Add Exercise to Database</h3>
      <form onSubmit={onSubmit}>
      <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
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
          <label>Reference (Photo Upload): </label>
          <input  type="file"
              className="form-control"
              onChange={(e) => onChangeReferencePhoto(e.target.files[0])}
              />
        </div>
        <h5> or </h5>
        <div className="form-group"> 
          <label>Reference (Image Link): </label>
          <input  type="link"
              className="form-control"
              onChange={(e) => onChangeReferenceLink(e)}
              />
        </div>
        <br></br>
        <div className="form-group">
          <input type="submit" value="Add Exercise" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
}

export default CreateExercise;