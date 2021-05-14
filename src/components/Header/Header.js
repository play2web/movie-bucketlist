import React, {setState} from 'react';
import uuid from 'react-uuid';

import { apiUrl } from '../../databases';

export class Header extends React.Component {
	constructor (props) {
		super();
		this.state = {
			matchMovies: [],
			queryWord: '',
		}
	}

	searching = e => {
		this.setState({
			queryWord: e.target.value,
		}, this.fetchResults);
	}

	fetchResults = () => {
		if (this.state.queryWord.length>=3) {
			fetch(`${apiUrl}s=${this.state.queryWord}`)
			.then(data => data.json())
			.then(results => results.Search ? this.setState({matchMovies: results.Search}) : this.setState({matchMovies: []}))
		}
	}

	displayMovie = (movie) => {
		if(this.props.movieList.some(movieInList => movieInList.Title===movie.Title)) {
			return <li key={uuid()}>{movie.Title}</li>
		} else {
			return <li key={uuid()}>{movie.Title} <img src='http://placehold.jp/20x20.png' alt='plus' onClick={() => this.setState({queryWord:''}, this.props.toWatch(movie))}/></li>
		}
	}
	

	showMatchingResults = () => this.state.matchMovies.length ? this.state.matchMovies.map(movie => this.displayMovie(movie)) : <div>X No matching results!</div>;

	render () {
		return (
			<header>
				<h1>MovieBUCKETLIST</h1>
				<div className='search'>
					<input type='text' placeholder='Search' value={this.state.queryWord} onChange={this.searching}/>
					<ul>
						{this.state.queryWord.length>=3 && this.showMatchingResults()}
					</ul>
				</div>
			</header>
		)
	}
}