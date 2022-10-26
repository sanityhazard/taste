import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Movie = (props) => {

    const [direction, setDirection] = useState(0)

    return (
        <motion.div className="movie" drag dragSnapToOrigin={ true }
            whileDrag={{ scale: 0.8, rotate: 5 * direction}}
            dragConstraints={{ top: 50, bottom: 50 }}
            dragTransition={{ bounceStiffness: 800, bounceDamping: 110 }}
            onDrag={
                (_, info) => setDirection(info.offset.x / Math.abs(info.offset.x))
            }
            onDragEnd={
                (_, info) => props.onSwipe(props.id, info.offset.x)
        }>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}/>
        </motion.div>
    )
}

export default Movie