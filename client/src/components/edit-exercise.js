import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import storage from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage } from "firebase/storage";

 const EditExercise = props =>{
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [prevRef, setPrevRef] = useState('');
  const [updatedImage, setUpdated] = useState(false);
  
  const params = useParams();

  useEffect(() => {
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
  },  []);

  const onChangeName = e => {
    setName(e.target.value);
  }

  const onChangeDescription = e => {
    setDescription(e.target.value);
  }

  const onChangeReference = async e => {
    setReference(e);
    setUpdated(true);
  }

   /* Start of image upload procedure */
  const uploadImage = file => {
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

// https://stackoverflow.com/questions/45045054/how-to-call-reffromurl-in-firebase-cloud-function
 const getFileFromURL = fileURL => {
  const fSlashes = fileURL.split('/');
  const fQuery = fSlashes[fSlashes.length - 1].split('?');
  const segments = fQuery[0].split('%2F');
  const fileName = segments.join('/');

  return fileName;
}

 const deleteImage = async url => {
    
  var filename = getFileFromURL(url);
  var deleteStorage = getStorage();
  var imageRef = ref(deleteStorage, filename);
    return new Promise(function(resolve, reject){
    deleteObject(imageRef).then(() => {
      resolve(console.log('deleted image from firebase'));
    }).catch((error) => {

    });
  })}

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

      window.location = '/';
  } else {

  const exercise = {
      name: name,
      description: description,
      reference: reference
  }
  console.log(exercise);

  axios.post('http://localhost:3001/exercises/update', exercise)
  .then(res => console.log(res.data));

  window.location = '/';
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
          <label>Reference: </label>
          <input  type="file"
              className="form-control"
              onChange={(e) => onChangeReference(e.target.files[0])}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }

  export default EditExercise;