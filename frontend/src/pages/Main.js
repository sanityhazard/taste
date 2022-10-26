import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '../components/Modal'
import AuthContext from '../context/AuthContext'

const Main = () => {

    const [isModalVisible, setModalVisible] = useState(false)
    const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

    return (
        <div className='background'>
            <Modal isVisible={isModalVisible} genres={genres}/>
            <div className="container-main">
                <h1>Find yours.</h1>
                <motion.button className="button-main"
                onClick={setModalVisible}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                    Start swiping
                </motion.button>
            </div>
        </div>
    )
}

export default Main