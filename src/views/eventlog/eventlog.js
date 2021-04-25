import "./eventlog.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function EventLog() {
	const [userName, setUserName] = useState("");

	const name_request = async () => {
		let data = {
			token: localStorage.getItem("auth-token"),
		};

		await axios
			.post("http://localhost:3000/post/user_info", data)
			.then((res) => {
				console.log("nombre int: ", res.data.payload.name);
				setUserName(res.data.payload.name);
			});
	};

	name_request();

	let history = useHistory();
	const logout = () => {
		localStorage.removeItem("auth-token");
		history.push("/");
	};

	return (
		<div className='background-events'>
			<div className='navbar-events'>
				<div className='name-events'> ¡Hola {userName}! </div>
				<div className='info-events'>
					<ul>
						<li>
							<a onClick={() => logout()} href='#'>
								Perfil
							</a>
						</li>
						<li>
							<a onClick={() => logout()} href='#'>
								Cerrar Sesión
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className='table-container container-fluid'>
				<table className='table-events'>
					<thead>
						<tr>
							<th>Fecha</th>
							<th>Anunciante</th>
							<th>Evento</th>
							<th>Comité</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>hola</td>
							<td>como estas</td>
							<td>como estas</td>
							<td>como estas</td>
						</tr>
						<tr>
							<td>hola</td>
							<td>como estas</td>
							<td>como estas</td>
							<td>como estas</td>
						</tr>
						<tr>
							<td>hola</td>
							<td>como estas</td>
							<td>como estas</td>
							<td>como estas</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='add-btn'>+</div>
		</div>
	);
}
