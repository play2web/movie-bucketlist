import React from 'react';
import './MovieInfo.css';
import { Link } from "react-router-dom";

export const MovieInfo = (props) => {

	return (
		<div className="card">
			<div className="card-header">
			<Link to={`/`}><i className="fa fa-arrow-circle-left"></i></Link>
			<span>Watched / Star Wars 2</span>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col-5">
						<img src="https://miro.medium.com/max/2716/1*-XWivw_W631IldZ5ZmIbyA.jpeg" className="img-fluid" />
					</div>
					<div className="col-7">
						<span className="notify-badge pull-right">9.2</span>
						<h2>Star Wars 2</h2>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Release date: 55555</li>
							<li className="list-group-item">Runtime: 2220</li>
							<li className="list-group-item">Genre: Drama, Action</li>
							<li className="list-group-item">
								<dl className="row">
									<dt className="col-sm-3">Actors:</dt>
									<dd className="col-sm-9">
										<p>Vestibulum id ligula porta felis euismod</p>
										<p>Donec id elit non mi porta gravida at eget metus.</p>
									</dd>
								</dl>
							</li>
							<li className="list-group-item">
								<dl className="row">
									<dt className="col-sm-3">Plot:</dt>
									<dd className="col-sm-9">
										<p>Vestibulum id ligula porta felis euismod,Vestibulum id ligula porta felis euismod Vestibulum id ligula porta felis euismodVestibulum id ligula porta felis euismod</p>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}