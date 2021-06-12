import "./profile.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Profile() {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");

	// Se obtiene el nombre del Cliente y el correo
	//Se usa useEffect para solo invocar una vez
	useEffect(() => {
		//Se extrae el token del local Storage

		const name_request = async () => {
			let data = {
				token: localStorage.getItem("auth-token"),
			};
			//Se hace la solicutud POST y se guardan las variable de 'name' e 'email'
			await axios
				.post("http://localhost:3000/post/user_info", data)
				.then((res) => {
					console.log("nombre int: ", res.data.payload);
					setUserName(res.data.payload.name);
					setUserEmail(res.data.payload.email);
				});
		};
		//se llama la funcion
		name_request();
	}, []);

	//Quitar el token de local storage y volvel a la pagina de inicio
	let history = useHistory();
	const logout = () => {
		localStorage.removeItem("auth-token");
		history.push("/");
	};

	const changeSymbol = () => {
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='20'
				height='20'
				fill='currentColor'
				class='bi bi-pencil'
				viewBox='0 0 16 16'
			>
				<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
			</svg>
		);
	};

	return (
		<div className='background-events'>
			{/* Información en el navbar*/}
			<div className='navbar-events'>
				<div className='name-events'> ¡Hola {userName}! </div>
				<div className='info-events'>
					<ul>
						<li>
							<Link to='/eventlog'>
								<a> Eventos</a>
							</Link>
						</li>
						<li>
							<a onClick={() => logout()} href='#'>
								Cerrar Sesión
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className='profCont'>
				<h1>
					<strong>Perfil</strong>
				</h1>
				<div className='profrow row'>
					<div className='profcol col-12 col-sm-6'>
						<div className='itemCell'>
							<h4> Nombres: </h4>
							<div className='inputline'>
								<input type='text'></input>
								<button>{changeSymbol()}</button>
							</div>
						</div>
						<div className='itemCell'>
							<h4> Apellidos: </h4>
							<div className='inputline'>
								<input type='text'></input>
								<button>{changeSymbol()}</button>
							</div>
						</div>
						<div className='itemCell'>
							<h4> Fecha de nacimineto: </h4>
							<div className='inputline'>
								<input type='text'></input>
								<button>{changeSymbol()}</button>
							</div>
						</div>
						<div className='itemCell'>
							<h4> Cedula: </h4>
							<div className='inputline'>
								<input type='text'></input>
								<button>{changeSymbol()}</button>
							</div>
						</div>
						<div className='itemCell'>
							<h4>Dirección</h4>
							<div className='inputline'>
								<input type='text'></input>
								<button>{changeSymbol()}</button>
							</div>
						</div>
					</div>
					<div className='profcol col-12 col-sm-6'>
						<div className='itemCell'>
							<h4> Correo Electronico: </h4>
							<div className='inputline'>
								<input type='text'></input>
								<button>{changeSymbol()}</button>
							</div>
						</div>
						<div className='itemCell'>
							<h4> Rol: </h4>
							<div className='inputline'>
								<input  type='text'></input>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
