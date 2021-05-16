import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
class App extends React.Component {
  constructor () {
    super();
    this.state={
      movieList:[],
    }
  }

  toWatch = (movie) => {
    //This part will be different affter connecting with firebase.
    console.log(movie)
    this.setState= {movieList:this.state.movieList.push(movie)}
  }

  render () {
    return (
      <Header toWatch={this.toWatch} movieList={this.state.movieList}/>
    )
  }
}

export default App;
