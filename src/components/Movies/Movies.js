import React from 'react';
import './Movies.css';
import uuid from 'react-uuid';

import { Movie } from '../Movie/Movie';

export const Movies = (props) => {

	const showMovies = (watched) => {
		const filtered = props.movieList.filter(movie => movie.watched===watched);
		return filtered.length ? filtered.map(movie => <Movie key={uuid()} movie={movie} watched={props.watched} hide={props.hide} remove={props.remove} move={props.move} filter={props.filter}/>) : <li>The list is empty</li>
	}

	return (
		<section>
			<h1>{!props.watched ? 'TO WATCH' : 'WATCHED'}</h1>
			<ul>
				{!props.watched && <img src='http://placehold.jp/20x20.png' alt='reset' onClick={props.reset}/>}
				{props.filters.length && !props.watched ? <ul>{props.filters.map(genre=><li key={uuid()}>{genre}</li>)}</ul> : null}
				{showMovies(props.watched)}
			</ul>
		</section>
	)
}