import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import '../styles/login.css'



const LogOut = props =>{

    const auth = getAuth();
    
    const signOutFunction = () => {
        signOut(auth).then(() => {
            window.location = '/';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        
      }

    return (
        <div className='logout'>
          <h3>Logout</h3>
            <button type="button" value="Sign Out" className="btn btn-primary" onClick={signOutFunction}>Sign Out</button>
        </div>
        )

}

export default LogOut;