import { useRef } from 'react'
import React from 'react';
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    let navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password does not match")
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("http://localhost:8000/api/auth/register", user)
                navigate("/login")
            } catch (err) {
                console.log(err)
            }
        }
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
                    <input placeholder='Enter your Username..' required ref={username} type="text" className="loginInput" />
                    <input placeholder='Enter your Email..' required ref={email} type="email" className="loginInput" />
                    <input placeholder='Enter your Password..' required ref={password} type="password" minLength= "6"className="loginInput" />
                    <input placeholder='Enter your Password again..' required ref={passwordAgain} type="password" className="loginInput" />
                    <button className="loginButton" type='submit'>Sign Up</button>
                    <button className="loginRegisterButton">Log into account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
