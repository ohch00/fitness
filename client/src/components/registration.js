import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../styles/login.css'


const Registration = props =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
        window.location = '/';
      }

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    return (
        <div className='login'>
          <h3>Registration</h3>
          <form onSubmit={signUp}>
          <div className="form-group"> 
              <label>Name: </label>
              <input  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => onChangeEmail(e)}
                  />
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => onChangePassword(e)}
                  />
            </div>
            <br></br>
            <div className="form-group">
              <input type="submit" value="Register" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )

}

export default Registration;