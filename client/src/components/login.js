import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../styles/login.css'



const Login = props =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    
    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
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
          <h3>Login</h3>
          <Link to="/register">
          <button className='registration'>Register</button>
          </Link>
          <form onSubmit={signIn}>
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
              <input type="submit" value="Sign In" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )

}

export default Login;