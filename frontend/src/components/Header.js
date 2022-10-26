import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {

    let { user, logoutUser } = useContext(AuthContext)

    return (
        <header>
            <Link to="" id="header-link">Taste</Link>
            <div className="auth">
                {!user ? (
                <Link to="/login" className="header-item">Login</Link>
                ): (
                    <>
                        <Link className="header-item" onClick={logoutUser}>Logout</Link>
                        <Link className="header-item" to="/profile">Profile</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header