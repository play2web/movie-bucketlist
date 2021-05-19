import React from 'react';
import uuid from 'react-uuid';
import './Header.css';
import { apiUrl } from '../../databases';

export class Header extends React.Component {
	constructor(props) {
		super();
		this.state = {
			matchMovies: [],
			queryWord: '',
		}
	}

	searching = e => this.setState({ queryWord: e.target.value }, this.fetchResults);

	fetchResults = () => {
		if (this.state.queryWord.length >= 3) {
			fetch(`${apiUrl}s=${this.state.queryWord}`)
				.then(data => data.json())
				.then(results => results.Search ? this.setState({ matchMovies: results.Search }) : this.setState({ matchMovies: [] }))
		}
	}

	displayMovie = (movie) => <li key={uuid()}><span className="mt-5">{movie.Title}</span>  {!this.props.movieList.some(movieInList => movieInList.imdbID === movie.imdbID) && <i className="fa fa-plus" onClick={() => this.setState({ queryWord: '' }, this.props.toWatch(movie))}></i>}</li>

	showMatchingResults = () => this.state.matchMovies.length ? this.state.matchMovies.map(movie => this.displayMovie(movie))  : <div className='no-match'>X No matching results!</div>;

	hideResults = () => document.documentElement.addEventListener('click', () => this.state.queryWord.length && this.setState({ queryWord: '' }))

	render() {
		return (
			<header className="section-header mb-5">
				<section className="header-main border-bottom pb-3">
					<div className="row align-items-center">
						<div className="col-2">
							<a href="#" className="brand-wrap" data-abc="true">
								<img className="logo img-fluid" src="https://image.freepik.com/free-vector/click-movie-logo-vector_18099-258.jpg"></img>
							</a> </div>
						<div className="col-10">
							<div className="input-group clearfix">
								<input className="form-control border-right-0" placeholder="Search" value={this.state.queryWord} onChange={this.searching} />
								<span className="input-group-append bg-white border-right-0">
									<span className="input-group-text bg-transparent">
										<i className="fa fa-search"></i>
									</span>
								</span>
								<ul className="absolute-position list-unstyled">
									{this.state.queryWord.length>=3 && this.showMatchingResults()}
									{this.hideResults()}
								</ul>
							</div>
						</div>
					</div>
				</section>
			</header>
		)
	}
}