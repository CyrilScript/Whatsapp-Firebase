import { Button } from '@material-ui/core';
import React from 'react';
import {auth, provider } from '../../firebase';
import './Login.css';
import { actionTypes } from '../../redux/reducer';
import { useStateValue } from '../../redux/StateProvider';

function Login() {
    const [{},dispatch] = useStateValue();
    
    const signIn =()=>{
        auth
        .signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error)=> console.warn(error.message))
    }
    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/239px-WhatsApp.svg.png" alt=""/>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
            
        </div>
    )
}

export default Login
