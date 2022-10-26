import React, { useEffect, useState } from 'react'

const Match = (props) => {

    const [homepage, setHomepage] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        props.api.get("/imdb_page", {
            params: {
                id: props.id
            },
            signal: controller.signal
        }).then(
            res => setHomepage(`https://www.imdb.com/title/${res.data.result}/`)
        ).catch(e => null)

        return () => controller.abort()

    }, [])

    return (
        <a href={homepage} name="homepage"><img className="match-movie" src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}/></a>
    )
}

export default Match