import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {

    let {loginUser, registerUser} = useContext(AuthContext)

    return (
        <div className="background">
            <div className="login-menu">
                <div className="login">
                    <p className="login-header">LOGIN</p>
                    <form onSubmit={(e) => {
                        let res = loginUser(e)
                        if (res) {
                            console.log(res)
                        }
                    }}>
                        <div className='login-form'>
                            <label>Email</label>
                            <input type="text" name="email" />
                        </div>
                        <div className='login-form'>
                            <label>Password</label>
                            <input type="text" name="password" />
                        </div>
                        <div className='continue'>
                            <button className='login-button' type='submit'>LOGIN</button>
                        </div>
                    </form>
                </div>
                <div className="register">
                    <p className="login-header">NOT A MEMBER YET?</p>
                    <form onSubmit={registerUser}>
                        <div className='login-form'>
                            <label>Name</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='login-form'>
                            <label>Email</label>
                            <input type="text" name="email" />
                        </div>
                        <div className='login-form'>
                            <label>Password</label>
                            <input type="text" name="password" />
                        </div>
                        <div className='continue'>
                            <button className='login-button' type='submit'>REGISTER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login