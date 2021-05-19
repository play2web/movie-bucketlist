import React from 'react';
import './Movies.css';
import uuid from 'react-uuid';

import { Movie } from '../Movie/Movie';

export const Movies = (props) => {

	const showMovies = (watched) => {
		return props.movieList.length ? props.movieList.map(movie => <Movie key={uuid()} movie={movie} movieList={props.movieList} watched={props.watched} hide={props.hide} remove={props.remove} move={props.move} filterGenre={props.filterGenre} />) : <li>The list is empty</li>
	}

	return (
		<>
			<div className={`page-header ${props.watched?'toWatch':'watched'}`}>
				<h1>{!props.watched ? 'TO WATCH' : 'WATCHED'}</h1>
			</div>
			{showMovies(props.watched)}
		</>
	)
}