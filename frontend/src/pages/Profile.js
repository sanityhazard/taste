import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import Match from '../components/Match'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

const Profile = () => {

    const api = useAxios()
    let [matches, setMatches] = useState([])

    let { authTokens } = useContext(AuthContext)

    let getMatches = async () => {
        const controller = new AbortController()
        let request = await api.get("/get_matches", {
            signal: controller.signal
        })
        setMatches(request.data.result)
        console.log(request.data.result)
    }

    useEffect(() => {
        getMatches()
    }, [])

    return (
        <div className='profile'>
            <p>My profile</p>
            <div className='line-break'></div>
            <p>Previos matches:</p>
            <div className='line-break'></div>
            <div className='profile-matches'>
                {matches.map((match, index) => (
                    <div key={index} className='profile-match'>
                        <a href={`https://www.imdb.com/title/${match.imdb_id}/`}><img src={`https://image.tmdb.org/t/p/w500${match.poster_path}`} alt="Poster image"/></a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile