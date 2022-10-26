import { useContext } from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    let { user } = useContext(AuthContext)
    
    if (user) {
        return children
    }

    return <Navigate to="/login" />
}

export default PrivateRoute;