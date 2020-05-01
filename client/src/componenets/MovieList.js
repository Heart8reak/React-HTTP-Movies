import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MoviceCard from './MovieCard'

export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        axios 
        .get("http://localhost:5000/api/movies")
        .then(res => this.setState({ movies: res.data}))
        .catch(err => console.log(err.response))
    }

    render() {
        return (
            <div className="movie-list">
                {this.state.movies.map(movie => (
                    <Moviedetails key={movie.id} movie={movie} />
                ))}
            </div>
        )
    }
}

function Moviedetails({ movie }) {
    return (
        <Link to={`/movies/${movie.id}`}>
            <MoviceCard movie={movie} />
        </Link>
    )
}