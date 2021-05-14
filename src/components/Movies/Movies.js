import React from 'react';
import './Movies.css';
import uuid from 'react-uuid';

import { Movie } from '../Movie/Movie';

export const Movies = (props) => {

	const showMovies = (watched) => {
		const filtered = props.movieList.filter(movie => movie.watched===watched);
		return filtered.length ? filtered.map(movie => <Movie key={uuid()} id={movie.id} title={movie.Title} genre={movie.Genre} rating={movie.imdbRating} watched={props.watched} hide={props.hide} remove={props.remove} move={props.move}/>) : <li>The list is empty</li>
	}

	return (
		<section className='wrapper'>
			<h1>{!props.watched ? 'TO WATCH' : 'WATCHED'}</h1>
			<ul>
				{showMovies(props.watched)}
			</ul>
		</section>
	)
}