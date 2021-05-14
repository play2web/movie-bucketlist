import React from 'react';
import './Movie.css';

export const Movie = (props) => {
	return (
		<li>
			<h4>{props.title}</h4>
			<span>{props.rating}</span>
			<p>{props.genre}</p>
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='plus' onClick={()=>props.hide(props.id)}/>}
			<img src='http://placehold.jp/20x20.png' alt='plus' onClick={()=>props.remove(props.id)}/>
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='plus' onClick={()=>props.move('up', props.id)}/>}
			{!props.watched && <img src='http://placehold.jp/20x20.png' alt='plus' onClick={()=>props.move('down', props.id)}/>}
		</li>
	)
}