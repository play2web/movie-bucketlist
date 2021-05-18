import React from 'react';
import './MovieInfo.css';
import { firebaseUrl } from '../../databases';
import { Link } from "react-router-dom";

export const MovieInfo = (props) => {
	const[movieList, setMovieList] = React.useState([]);
	const[movie, setMovie] = React.useState({});

	const getResults = () => {
	   fetch(`${firebaseUrl}.json`)
      .then(data => data.json())
      .then(results => {
        const resultTransformed = [];
        for (const result in results) {
          resultTransformed.unshift({ ...results[result], id: result })
        }
       setMovieList(resultTransformed);
      })
	}

	const showMovie = () => {
		const id = window.location.pathname.substring(1);
		const movie = movieList.find(movie=>movie.id.includes(id))
		setMovie(movie);
		console.log(movie)
	}

	const displayInfo = () => (
		<>
		<div className="card-header">
			<Link to={`/`}><i className="fa fa-arrow-circle-left"></i></Link>
			<span>{!movie.watched ? 'To Watch': 'Watched'} / <span className='mov-title'>{movie.Title}</span></span>
			{console.log(movie.watched)}
		</div>
		<div className="card-body">
			<div className="row">
				<div className="col-5">
					<img src={movie.Poster} alt='poster' className="img-fluid" />
				</div>
				<div className="col-7">
					<span className="notify-badge pull-right">{movie.imdbRating}</span>
					<h2>{movie.Title}</h2>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Release date: {movie.Released}</li>
						<li className="list-group-item">Runtime: {movie.Runtime}</li>
						<li className="list-group-item">Genre: {movie.Genre}</li>
						<li className="list-group-item">
							<dl className="row">
								<dt className="col-sm-3">Actors:</dt>
								<dd className="col-sm-9">
									<p>{movie.Actors}</p>
								</dd>
							</dl>
						</li>
						<li className="list-group-item">
							<dl className="row">
								<dt className="col-sm-3">Plot:</dt>
								<dd className="col-sm-9">
									<p>{movie.Plot}</p>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
		</div>
		</>
	)

	React.useEffect(getResults,[]);
	React.useEffect(showMovie,[movieList]);

	return (
		<div className="card">
			{movie && displayInfo()}
		</div>
	)
}