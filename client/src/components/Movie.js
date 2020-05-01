import React, { Component } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'


export default class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: null
        }
    }

    componentDidMount() {
        this.fetchMovie(this.props.match.params.id)
    }

    componentDidUpdate(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.fetchMovie(newProps.match.params.id)
        }
    }

    fetchMovie = id => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => this.setState({ movie: res.data }))
        .catch(err => console.log(err.response))
    }

    savedMovie = () => {
        const addToSavedList = this.props.addToSavedList
        addToSavedList(this.state.movie)
    }

    handleDelete = () => {
        axios
        .delete(`http://localhost:5000/api/movies/${this.props.match}`)
        .then(res => {
            console.log(res)
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if (!this.state.movie) {
            return <div>Loading movie information......</div>
        }

        return (
            <div className="save-wrapper">
                <MovieCard movie={this.state.movie} />
                <br />
                <div 
                className="save-button"
                onClick={this.saveMovie}
                >
                    <strong>Save</strong>
                </div>
                <br />
                <button>
                    <Link
                    to={`/update-movie/${this.state.movie.id}`}
                    >
                    Edit
                    </Link>
                </button>
                <button>
                    <Link
                    to={`/update-movie${this.state.movie.id}`}
                    >
                    Delete
                    </Link>
                </button>
            </div>
        )
    }
}