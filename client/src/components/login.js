import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import '../styles/login.css'

const Login = props =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = auth.currentUser;

    useEffect(() => {
      if (user) {
        window.location = '/logout';
      } },  []);
    
    const signIn = e => {
      e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location = '/';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        
      }
    
    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const onChangePassword = e => {
      var pass = document.getElementById('password');
        pass.type = 'password';
        setPassword(e.target.value);
    }

    const showPassword = () => {
      var show = document.getElementById('password');
      if (show.type === 'password'){
        show.type = 'text';
      } else {
        show.type = 'password';
      }
    }

    return (
        <div className='login'>
          <h3>Login</h3>
          <Link to="/register">
          <button className='registration'>Register</button>
          </Link>
          <div className="form-group"> 
              <label>Email: </label>
              <input  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => onChangeEmail(e)}
                  />
            </div>
            <div className="form-group"> 
              <label>Password: </label>
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
              <button type="button" value="Sign In" className="btn btn-primary" onClick={signIn}>Sign In</button>
            </div>
        </div>
        )

}

export default Login;