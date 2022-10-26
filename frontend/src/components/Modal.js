import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Genre from './Genre'
import { useNavigate } from 'react-router-dom'

const Modal = ({ isVisible, genres }) => {

    const navigate = useNavigate()
    const [selected, setSelect] = useState(() => Array.from({length: genres.length}, (_, id) => ({id: genres[id].id, selected: false})),)

    const select = (id) => {
        setSelect(s => 
            s.map((item) =>
                item.id === id ? {...item, selected: !item.selected} : item,
            ),
        )
    }

    const filterIds = (items) => {
        let ids = []
        for (let item of items) {
            if (item.selected === true) {
                ids.push(item.id)
            }
        }
        return ids
    }

    return (
        <AnimatePresence>
            {isVisible && (
            <motion.div
            className='genre-modal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <div className='container-genre'>
                    <h2>Choose genres:</h2>
                    { genres.map((choice) => (
                        <Genre key={choice.id} name={choice.name} select={() => select(choice.id)} selected={selected.filter(item => item.id === choice.id)[0].selected}/>
                    )) }
                    <motion.button id="continue"
                    onClick={() => navigate("/movies", { state: { selected: filterIds(selected)}})}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                        Continue
                    </motion.button>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal