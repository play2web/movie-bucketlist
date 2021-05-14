import React from 'react';
import './Movie.css';
import uuid from 'react-uuid';

export const Movie = (props) => {

	const [genres, setGenres] = React.useState([]);

	React.useEffect(()=>{
		setGenres(props.movie.Genre.split(', '));
	},[props.movie.Genre])

	return (
		<li>
			<h4>{props.movie.Title}</h4>
			<span>{props.movie.Rating}</span>
			<ul>
				{genres.map(genre => <li key={uuid()} onClick={()=>props.filter({genre}, props.watched)}>{genre}</li>)}
			</ul>
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='watched' onClick={()=>props.hide(props.movie.id)}/>}
			<img src='http://placehold.jp/20x20.png' alt='delete' onClick={()=>props.remove(props.movie.id)}/>
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='up' onClick={()=>props.move('up', props.movie.id)}/>}
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='down' onClick={()=>props.move('down', props.movie.id)}/>}
		</li>
	)
}