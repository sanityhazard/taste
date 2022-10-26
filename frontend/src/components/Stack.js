import React from 'react'
import Movie from './Movie'

const Stack = () => {

    const movies = [1, 2, 3]

    return (
        <div className='stack'>
            {movies.map((movie) => (
                <Movie name={movie} />
            ))}
        </div>

    )
}

export default Stack