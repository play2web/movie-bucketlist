import React, {setState} from 'react';
import uuid from 'react-uuid';

const movieList = [{
		name: 'Star Wars',
		id: 22
	},
	{
		name: 'Titanic',
		id: 2732
	},
	{
		name: 'Home Alone',
		id: 25
	},
	{
		name: 'Girl from train',
		id: 2222
	},
	{
		name: 'Gone Girl',
		id:3745
	},
];

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
			//this part will be changed after we add API to our application
			this.setState({
				matchMovies:movieList.filter(movie => movie.name.toLowerCase().indexOf(this.state.queryWord.toLowerCase())>-1),
			})
		}
	}

	displayMovie = (movie) => {
		if(this.props.movieList.some(movieInList => movieInList.name===movie.name)) {
			return <li key={uuid()}>{movie.name}</li>
		} else {
			return <li key={uuid()}>{movie.name} <img src='http://placehold.jp/20x20.png' alt='plus' onClick={() => this.setState({queryWord:''}, this.props.toWatch(movie))}/></li>
		}
	}
	

	showMatchingResults = () => this.state.queryWord.length>=3 ? this.state.matchMovies.map(movie => this.displayMovie(movie)) : null;

	render () {
		return (
			<header>
				<h1>MovieBUCKETLIST</h1>
				<div className='search'>
					<input type='text' placeholder='Search' value={this.state.queryWord} onChange={this.searching}/>
					<ul>
						{this.showMatchingResults()}
					</ul>
				</div>
			</header>
		)
	}
}