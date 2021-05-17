import React from 'react';
import './App.css';
import uuid from 'react-uuid';
import { firebaseUrl } from './databases';
import { apiUrl } from './databases';
import { Header } from './components/Header/Header';
import { Movies } from './components/Movies/Movies';
import { MovieInfo } from './components/MovieInfo/MovieInfo';
import { Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movieList: [],
      toWatch:[],
      watched:[],
      filters: [],
    }
  }

  toWatch = (movie) => {
    fetch(`${apiUrl}i=${movie.imdbID}`)
      .then(data => data.json())
      .then(result => {
        fetch(`${firebaseUrl}.json`, {
          method: 'POST',
          body: JSON.stringify({ ...result, imdbID: movie.imdbID, watched: false })
        })
          .then(data => data.status === 200 ? this.getResults() : console.log('Something get wrong...'))
      })
  }

  getResults = () => {
    fetch(`${firebaseUrl}.json`)
      .then(data => data.json())
      .then(results => {
        const resultTransformed = [];
        for (const result in results) {
          resultTransformed.unshift({ ...results[result], id: result })
        }
        const toWatch = resultTransformed.filter(movie => !movie.watched)
        const watched = resultTransformed.filter(movie => movie.watched)
        this.setState({ movieList: resultTransformed, toWatch: toWatch, watched: watched, filters: [] });
      })
  }

  hide = (id) => {
    const movie = this.state.movieList.find(movie => movie.id === id);
    movie.watched = true;
    fetch(`${firebaseUrl}${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify(movie)
    })
      .then(data => data.status === 200 ? this.getResults() : console.log('Something get wrong...'))
  }

  remove = (id) => {
    const movie = this.state.movieList.find(movie => movie.id === id);
    fetch(`${firebaseUrl}${id}.json`, {
      method: 'DELETE',
      body: JSON.stringify(movie)
    })
      .then(data => data.status === 200 ? this.getResults() : console.log('Something get wrong...'))
  }

  move = (position, movie) => {
    const indexOfMoveMovie = this.state.toWatch.indexOf(movie);

    if (position === 'up' && indexOfMoveMovie !== 0) {
      this.state.toWatch.splice(indexOfMoveMovie, 1);
      this.state.toWatch.splice(indexOfMoveMovie - 1, 0, movie);
      this.setState({toWatch: this.state.toWatch})
    } else if (position === 'down' && indexOfMoveMovie !== this.state.toWatch.length - 1) {
      this.state.toWatch.splice(indexOfMoveMovie, 1);
      this.state.toWatch.splice(indexOfMoveMovie + 1, 0, movie);
      this.setState({toWatch: this.state.toWatch })
    }
  }

  filter = (genre, whached) => {
    if (!whached) {
      if (this.state.filters.indexOf(genre.genre) === -1) {
        const filteredMovies = this.state.toWatch.filter(movie => movie.Genre.includes(genre.genre))
        this.setState({ toWatch: filteredMovies, filters: [...this.state.filters, genre.genre] });
      }
    }
  }

  componentDidMount() {
    this.getResults();
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={App}>
            <Header toWatch={this.toWatch} movieList={this.state.movieList} query={this.state.query} />
            <div className=" pull-right">Reset filters<i className="fa fa-filter pull-right" onClick={()=>this.getResults()}></i></div>
            <div className=" pull-right">{this.state.filters.map(genre=><span key={uuid()}>{genre}</span>)}</div>
            <Movies watched={false} movieList={this.state.toWatch} hide={this.hide} remove={this.remove} move={this.move} filter={this.filter} filters={this.state.filters} reset={this.getResults} />
            <Movies watched={true} movieList={this.state.watched} hide={this.hide} remove={this.remove} move={this.move} filter={this.filter} filters={this.state.filters} reset={this.getResults} />
          </Route>
          <Redirect exact from="/movie-info" to="/" />
          <Route path="/:id" component={MovieInfo} />
        </Switch>
      </>
    )
  }
}

export default App;