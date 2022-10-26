import React, { createContext, useState, useEffect, ReactDOM } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.email.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong.. are you registered?')
        }
    }

    let registerUser = async (e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.email.value, 'first_name': e.target.name.value, 'email': e.target.email.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 201) {
            // setAuthTokens(data)
            // setUser(jwt_decode(data.access))
            // localStorage.setItem('authTokens', JSON.stringify(data))
            navigate(0)
            alert('Great! Now log in your account.')
        } else {
            alert('Something went wrong.. try again later.')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        registerUser:registerUser,
        logoutUser:logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
          setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
      }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}