import React, { useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import AddMovie from './components/AddMovie'
import Movie from './components/Movie'
import MovieList from './components/MovieList';
import SavedList from './components/SavedList';

function App() {
  const [savedList, setSavedList] = useState([])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
  }
  return (
    <div className="App">
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return < Movie {...props} addToSavedList={addToSavedList} />
        }}
      />

      <Route
        path="/add-movie"
        render={props => {
          return <AddMovie
            {...props}
            items={savedList}
          />
        }}
      />
    </div>
  );
}

export default App;
