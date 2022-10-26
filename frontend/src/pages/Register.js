import React from 'react'

const Register = () => {
  return (
    <>
        <div className="register-menu">
            <div className="login">
                <p>Login</p>
                <div className='login-form'>
                    <label>Email address</label>
                    <input type="text" name="email" />
                </div>
                <div className='login-form'>
                    <label>Email address</label>
                    <input type="text" name="password" />
                </div>
                <button className='login-button'>LOGIN</button>
            </div>
            <div className="register">
                <p>Login</p>
                <div className='login-form'>
                    <label>Enter your email address to get a registration link</label>
                    <input type="text" name="register-email" />
                </div>
                <p id="nevermind">Nevermind, continue without registering</p>
                <button id='login-button'>LOGIN</button>
            </div>
        </div>
    </>
  )
}

export default Register