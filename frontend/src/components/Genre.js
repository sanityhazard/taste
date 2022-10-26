import React from 'react'
import { motion } from 'framer-motion'


const Genre = ({ name, select, selected }) => {

    return (
        <motion.button
        className={`genre-choice ${selected === true ? "selected" : ""}`}
        onClick={select}
        animate
        >
            { name }
        </motion.button>
    )
}

export default Genre