import React from 'react';
import './App.css';
import { firebaseUrl } from './databases';
import { apiUrl }  from './databases';
import {Header} from './components/Header/Header';

class App extends React.Component {
  constructor () {
    super();
    this.state={
      movieList:[],
    }
  }

  toWatch = (movie) => {
    fetch(`${apiUrl}i=${movie.imdbID}`)
    .then(data => data.json())
    .then(result => {
      fetch(`${firebaseUrl}.json`, {
        method:'POST',
        body:JSON.stringify({...result, watched:false})
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
      this.setState({movieList: resultTransformed});
    })
  }

  render () {
    return (
      <Header toWatch={this.toWatch} movieList={this.state.movieList}/>
    )
  }
}

export default App;