import React from 'react';
import './Movie.css';
import uuid from 'react-uuid';

export const Movie = (props) => {

	const [genres, setGenres] = React.useState([]);

	React.useEffect(()=>{
		setGenres(props.genre.split(', '));
	},[])

	return (
		<li>
			<h4>{props.title}</h4>
			<span>{props.rating}</span>
			<ul>
				{genres.map(genre => <li key={uuid()} onClick={()=>props.filter({genre}, props.watched)}>{genre}</li>)}
			</ul>
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='watched' onClick={()=>props.hide(props.id)}/>}
			<img src='http://placehold.jp/20x20.png' alt='delete' onClick={()=>props.remove(props.id)}/>
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='up' onClick={()=>props.move('up', props.id)}/>}
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='down' onClick={()=>props.move('down', props.id)}/>}
		</li>
	)
}