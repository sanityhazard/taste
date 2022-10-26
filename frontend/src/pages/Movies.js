import React, { useContext, useEffect, useState } from 'react'
import Movie from '../components/Movie'
import { useLocation } from 'react-router-dom'
import getWindowDimensions from '../utils/getWindowDimensions'
import axios from 'axios'
import Match from '../components/Match'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

const Movies = () => {

    const location = useLocation()
    const genres = location.state.selected
    const { width } = getWindowDimensions()

    const [stack, setStack] = useState([])
    const [matches, setMatches] = useState([])
    const [page, setPage] = useState(1)

    const api = useAxios()

    let { authTokens } = useContext(AuthContext)

    let updateStack = async () => {
        const controller = new AbortController()

        if (stack.length === 0) {
            let response = await api.get("/movies", {
                params: {
                    genres: genres.join(','),
                    page: page
                },
                signal: controller.signal
            })
            setStack(s => [...s, ...response.data.result])
            console.log(response)
            setPage(page => page + 1)
            return () => controller.abort()
        }
    }

    useEffect(() => {
        updateStack()
    }, [stack])

    const onSwipe = (id, x) => {
        if (Math.abs(x) > width / 5) {
          if (x > 0) {
            const controller = new AbortController()
            let newMatch = stack.filter((movie) => movie.id === id)[0]
            setMatches(s => [...s, newMatch])
            if (authTokens) {
                console.log("Match added")
                api.post("/add_match", {
                    data: {
                        poster_path: newMatch.poster_path,
                        id: newMatch.id
                    },
                    signal: controller.signal,
                }).then().catch(e => null)
            }
          }
          setStack(s => s.filter((movie) => movie.id !== id))
          console.log(id, x)
        }
      }

    return (
        <div className="movies">
            <div className="flex-container">
                <svg className='arrow-left' width="75" height="34" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                <div className='stack'>
                    {stack.map((movie) => (
                        <Movie key={movie.id} {...movie} onSwipe={onSwipe} />
                    ))}
                </div>
                <svg className='arrow' width="75" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
            </div>
            <div className="matches" onScroll={(e) => {
                console.log(e)
            }}>
                {matches.map((match) => (
                    <Match key={match.id} {...match} api={api}/>
                ))}
            </div>
        </div> 
    )
}

export default Movies