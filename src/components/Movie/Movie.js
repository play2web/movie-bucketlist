import React from 'react';
import './Movie.css';
import uuid from 'react-uuid';
import { Link } from "react-router-dom";

export const Movie = (props) => {

	const [genres, setGenres] = React.useState([]);

	React.useEffect(() => {
		setGenres(props.movie.Genre.split(', '));
	}, [props.movie.Genre])

	return (
		<div className="row mt-4">
			<div className="item col-12 mb-3">
				<div className="card rounded shadow border-0">
					<div className="row">
						<div className="col-2">
							<img className="w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9vmDsj0afzD9kB38ZOGx_bPqhi6t-Jx2q6A&usqp=CAU" alt="" />
						</div>
						<div className="col-10">
							<div className="card-body p-3">
								<Link to={`/movie-info/${props.movie.id}`} className="text-dark"><h4>{props.movie.Title}</h4></Link>
								<p className="text-muted small">{props.movie.Rating}</p>
								<ul className="list-inline">
									{genres.map(genre => <li className="list-inline-item" key={uuid()} onClick={() => props.filter({ genre }, props.watched)}>
										{genre}
									</li>)}
								</ul>
								<div className="btn-group" role="group" aria-label="Basic example">
									{!props.watched && <button type="button" className="btn btn-secondary" onClick={() => props.hide(props.movie.id)}><i className="fa fa-eye"></i></button>}
									{props.watched && <button type="button" className="btn btn-secondary" onClick={() => props.remove(props.movie.id)}><i className="fa fa-trash"></i></button>}
									{!props.watched && <button type="button" className="btn btn-secondary" onClick={() => props.move('up', props.movie.id)}><i className="fa fa-arrow-up"></i></button>}
									{!props.watched && <button type="button" className="btn btn-secondary" onClick={() => props.move('down', props.movie.id)}><i className="fa fa-arrow-down"></i></button>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}