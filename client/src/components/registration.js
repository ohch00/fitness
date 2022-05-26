import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js"
import '../styles/login.css'


const Registration = props =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signUp = e => {

      e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            const userDB = { username: email }
            axios.post('http://localhost:3001/users/add', userDB)
            .then(res => console.log(res.data));
            window.location = '/';
            

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " - " + errorMessage);
        })
        
      }
    
    const showPassword = () => {
      var show = document.getElementById('password');
      if (show.type === 'password'){
        show.type = 'text';
      } else {
        show.type = 'password';
      }
    }

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const onChangePassword = e => {
        var pass = document.getElementById('password');
        pass.type = 'password';
        setPassword(e.target.value);
    }

    return (
        <div className='login'>
          <h3>Registration</h3>
          <div className="form-group"> 
              <label>Email: </label>
              <input  type="email"
              required
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => onChangeEmail(e)}
                  />
            </div>
            <div className="form-group"> 
              <label>Password (6 characters minimum): </label>
              <input  type="text"
              autoComplete='off'
              id='password'
              minLength="6"
              required
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => onChangePassword(e)}
                  />
                <input type="checkbox" onClick={showPassword}/>Show Password
            </div>
            <br></br>
            <div className="form-group">
              <input type="button" value="Register" onClick={signUp} className="btn btn-primary"/>
            </div>
          </div>
        )

}

export default Registration;