import React from 'react';
import './App.css';
import { firebaseUrl } from './databases';
import { apiUrl }  from './databases';
import {Header} from './components/Header/Header';
import { Movies } from './components/Movies/Movies';

class App extends React.Component {
  constructor () {
    super();
    this.state={
      movieList:[],
      filters:[],
    }
  }

  toWatch = (movie) => {
    fetch(`${apiUrl}i=${movie.imdbID}`)
    .then(data => data.json())
    .then(result => {
      fetch(`${firebaseUrl}.json`, {
        method:'POST',
        body:JSON.stringify({...result, imdbID: movie.imdbID, watched:false})
      })
      .then(data => data.status === 200 ? this.getResults() : console.log('Something get wrong...'))
    })
  }

  getResults = () => {
    fetch(`${firebaseUrl}.json`)
    .then(data => data.json())
    .then(results => {
      const resultTransformed = [];
      for(const result in results) {
        resultTransformed.unshift({...results[result], id:result})
      }
      this.setState({movieList: resultTransformed, filters:[]});
    })
  }

  hide = (id) => {
    const movie = this.state.movieList.find(movie => movie.id===id);
    movie.watched = true;
    fetch(`${firebaseUrl}${id}.json`, {
      method:'PATCH',
      body:JSON.stringify(movie)
    })
    .then(data => data.status === 200 ? this.getResults() : console.log('Something get wrong...'))
  }

  remove = (id) => {
    const movie = this.state.movieList.find(movie => movie.id===id);
    fetch(`${firebaseUrl}${id}.json`, {
      method:'DELETE',
      body:JSON.stringify(movie)
    })
    .then(data => data.status === 200 ? this.getResults() : console.log('Something get wrong...'))
  }

  move = (position, id) => {
    const movie = this.state.movieList.find(movie => movie.id===id);
    const indexOfMoveMovie = this.state.movieList.indexOf(movie);
    
    if(position==='up' && indexOfMoveMovie!==0) {
      this.state.movieList.splice(indexOfMoveMovie,1);
      this.state.movieList.splice(indexOfMoveMovie-1, 0, movie);
      this.setState({movieList:this.state.movieList})
    } else if (position==='down' && indexOfMoveMovie!==this.state.movieList.length-1) {
      this.state.movieList.splice(indexOfMoveMovie,1);
      this.state.movieList.splice(indexOfMoveMovie+1, 0, movie);
      this.setState({movieList:this.state.movieList})
    } 
  }

  filter = (genre, whached) => {
    if(!whached) {
      if(this.state.filters.indexOf(genre.genre)===-1) {
        let filteredMovies = this.state.movieList.filter(movie=>movie.watched)
        filteredMovies.push( ...this.state.movieList.filter(movie=>!movie.watched && movie.Genre.includes(genre.genre)))
        this.setState({movieList: filteredMovies,filters:[...this.state.filters, genre.genre]});
      }
    }
  }

  componentDidMount() {
    this.getResults();
  }

  render () {
    return (
      <>
        <Header toWatch={this.toWatch} movieList={this.state.movieList} query={this.state.query}/>
        <Movies watched={false} movieList={this.state.movieList} hide={this.hide} remove={this.remove} move={this.move} filter={this.filter} filters={this.state.filters} reset={this.getResults} />
        <Movies watched={true} movieList={this.state.movieList} hide={this.hide} remove={this.remove} move={this.move} filter={this.filter} filters={this.state.filters} reset={this.getResults}/>
      </>
    )
  }
}

export default App;