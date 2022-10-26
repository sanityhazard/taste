import './App.css'
import { Link, Route, Routes }from "react-router-dom"
import { AuthProvider } from './context/AuthContext'
import AuthContext from './context/AuthContext'
import Main from './pages/Main'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import PrivateRoute from './utils/PrivateRoute'
import { useContext } from 'react'
import Header from './components/Header'
import Profile from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <div className='App'>
            <Header />
            <Routes>
                <Route path="/" exact element={<Main />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/movies" element={<Movies />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <footer>
                <p>Made by <span className="violet">sanityhazard</span></p>
            </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
