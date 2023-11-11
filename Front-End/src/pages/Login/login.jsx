import { useRef } from 'react';
import React from 'react'
import './login.css'
import { loginCalls } from "../apiCalls";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from '@mui/material';

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCalls({email:email.current.value,password:password.current.value}, dispatch)
    }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">AshhadSocial</h3>
                <span className="loginDesc">Connects with friends and the world around you on AshhadSocial.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder='Enter your Email..' type="email" required className="loginInput" ref={email} />
                    <input placeholder='Enter your Password..' type="password" required minLength= "6" className="loginInput" ref={password}/>
                    <button className="loginButton" type='submit' disabled = {isFetching}>{isFetching ? <CircularProgress color='inherit' size={20}/> : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">{isFetching ? <CircularProgress color='inherit' size={20}/> : "Create a New Account"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}
