import React, { useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import MovieList from './componenets/MovieList';
import SavedList from './componenets/SavedList';

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
      <MovieList />
    </div>
  );
}

export default App;
