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

	const summonAdd = () => {
		document.getElementById("btncont").style.display = "none";
		document.getElementById("newEventWindows").style.display = "block";
	};

	const btnSubmit = () => {
		document.getElementById("btncont").style.display = "block";
		document.getElementById("newEventWindows").style.display = "none";
	};

	const summonMssg =()=>{	
		document.getElementById("btncont").style.display = "none";
		document.getElementById("newMessage").style.display = "block";		
	}

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
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>hola</td>
							<td>como estas</td>
							<td>como estas</td>
						</tr>
						<tr>
							<td>hola</td>
							<td>como estas</td>
							<td>como estas</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='btnContainer' id="btncont">
				<div onClick={() => summonAdd()} id='addbtn' className='add-btn'>
					<h1 className='plusign'>+</h1>
				</div>
				<div onClick={() => summonMssg()} id='msgbtn' className='add-btn'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='35'
						height='35'
						fill='currentColor'
						class='bi bi-mailbox'
						viewBox='0 0 16 16'
					>
						<path d='M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z' />
						<path d='M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z' />
					</svg>
				</div>
			</div>
			<div id='newEventWindows' className='newEventWindows'>
				<div className='addContent'>
					<h1>
						<strong>Agregar Evento</strong>
					</h1>
					<form>
						<div className='nomcol'>
							<h3>Nombre de Evento:</h3>
							<input type='text'></input>
						</div>
						<div className='fecharow'>
							<h3>Fecha del Evento:</h3>
							<input type='date'></input>
						</div>
						<div className='fecharow'>
							<h3>Comites invitados:</h3>
						</div>
						<div className='comiteSelect'>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Salud
								</label>
							</div>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Ambiente
								</label>
							</div>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Deporte
								</label>
							</div>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Genero
								</label>
							</div>
						</div>
						<div className='eventdes'>
							<h3>Descripción del evento:</h3>
						</div>
						<textarea rows='5'></textarea>
						<div onClick={() => btnSubmit()} className='btnCont'>
							<button> Agregar</button>
						</div>
					</form>
				</div>
			</div>
			<div id='newMessage' className='newEventWindows'>
				<div className='addContent'>
					<h1>
						<strong>Redactar Correo Masivo</strong>
					</h1>
					<form>
						<div className='nomcol'>
							<h3>Asunto:</h3>
							<input type='text'></input>
						</div>
						<div className='eventdes'>
							<h3>Cuerpo del Correo:</h3>
						</div>
						<textarea rows='5'></textarea>
						<div className='fecharow'>
							<h3>Enviar a comites:</h3>
						</div>
						<div className='comiteSelect'>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Salud
								</label>
							</div>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Ambiente
								</label>
							</div>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Deporte
								</label>
							</div>
							<div className='labelContainer'>
								<input className='inputcom' id='salud' type='checkbox'></input>
								<label className='labelcom' for='salud'>
									Genero
								</label>
							</div>
						</div>
						<div onClick={() => btnSubmit()} className='btnCont mt-4'>
							<button> Enviar Correo</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
