import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = (props) => {
    const [movieInfo, setMovieInfo] = useState({ initialItem })
    const { id } = useParams()

    useEffect(() => {
        axios 
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovieInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const changeHandle = e => {
        e.persist()
        let value = e.target.value
        if (e.target.name === "metascore") {
            value = parseInt(value, 10)
        }
        console.log(movieInfo)
        setMovieInfo({
            ...movieInfo,
            [e.target.name]: value
        })
    }

    const changeHandler = e => {
        setMovieInfo({
            ...movieInfo,
            stars: [e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(movieInfo)
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
        .then(res => {
            console.log(movieInfo)
            setMovieInfo(initialItem)
            props.history.push('/')
        })
    }

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="title"
                placeholder="Title"
                onChange={changeHandle}
                value={movieInfo.title}
                />
                <br />

                <input 
                type="text"
                name="director"
                placeholder="Director"
                onChange={changeHandle}
                value={movieInfo.director}
                />
                <br />

                <input 
                type="text"
                name="metascore"
                placeholder="Metascore"
                onChange={changeHandle}
                value={movieInfo.metascore}
                />
                <br />

                <input 
                type="text"
                name="stars"
                placeholder="Stars"
                onChange={changeHandler}
                value={movieInfo.stars}
                />
                <br />
                
                <button>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie