import "./eventlog.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function EventLog() {
	//Declaracion de variables que almacenan los datos de los formularios
	const [userRol, setUserRol] = useState("");
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [eventData, SetEventData] = useState({
		evname: "",
		evfecha: "",
		evdescrip: "",
		evsalud: false,
		evambiente: false,
		evgenero: false,
		evdeporte: false,
		evjuventud: false,
	});
	const { messData, setMessData } = useState({});

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
					setUserRol(res.data.payload.rol);
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

	//manejar las entradas de usuario de la ventana de eventos
	const handleEventForm = (e) => {
		if (e.target.type === "checkbox") {
			const { name, checked } = e.target;
			SetEventData((prevState) => ({
				...prevState,
				[name]: checked,
			}));
		} else {
			const { name, value } = e.target;
			SetEventData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
		console.log(eventData);
	};

	//manejar las entradas de usuario de la ventana de Mensajes
	const handleMessageForm = (e) => {
		if (e.target.type === "checkbox") {
			const { name, checked } = e.target;
			setMessData((prevState) => ({
				...prevState,
				[name]: checked,
			}));
		} else {
			const { name, value } = e.target;
			setMessData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	//abrir la ventana de eventos
	const summonAdd = () => {
		document.getElementById("btncont").style.display = "none";
		document.getElementById("newEventWindows").style.display = "block";
		setTimeout(() => {
			document.getElementById("newEventWindows").style.opacity = 1;
		}, 10);
	};

	//abrir la ventana de mensajes
	const summonMssg = () => {
		document.getElementById("btncont").style.display = "none";
		document.getElementById("newMessage").style.display = "block";
		setTimeout(() => {
			document.getElementById("newMessage").style.opacity = 1;
		}, 10);
	};

	//cerrar la ventana de eventos
	const closeEvent = () => {
		document.getElementById("btncont").style.display = "flex";
		document.getElementById("newEventWindows").style.display = "none";
		document.getElementById("newEventWindows").style.opacity = 0;
	};

	//cerrar la ventana de mensajes
	const closemail = () => {
		document.getElementById("btncont").style.display = "flex";
		document.getElementById("newMessage").style.display = "none";
		document.getElementById("newMessage").style.opacity = 0;
	};

	//Enviar los datos del formualario de EVENTOS nuevos al servidor
	const btnSubmit = (e) => {
		e.preventDefault();
		// document.getElementById("btncont").style.display = "block";
		// document.getElementById("newEventWindows").style.display = "none";

		// Funcion asincrona para enviar informacion al servidor y esperar respuesta
		const sendEvent = async () => {
			//Se estrucutra la informacion que se va a enviar
			let data = {
				token: localStorage.getItem("auth-token"),
				form: {
					evname: eventData.evname,
					evfecha: eventData.evfecha,
					evdescrip: eventData.evdescrip,
					evUserEmail: userEmail,
					cominvi: {
						evsalud: eventData.evsalud,
						evambiente: eventData.evambiente,
						evgenero: eventData.evgenero,
						evdeporte: eventData.evdeporte,
						evjuventud: eventData.evjuventud,
					},
				},
			};

			//se envia la informacion
			await axios
				.post("http://localhost:3000/post/new_event", data)
				.then((res) => {
					if (res.data.status === true) {
						alert("Evento agregado exitosamente");
						closeEvent();
					}
					else{
						alert("Error en el servidor, intente mas tarde");
						closeEvent();
					}
				});
		};

		sendEvent();
	};

	//Enviar los datos del formualario de MENSAJE nuevos al servidor
	const btnMessSubmit = () => {
		document.getElementById("btncont").style.display = "block";
		document.getElementById("newMessage").style.display = "none";
	};

	return (
		<div className='background-events'>
			{/* Información en el navbar*/}
			<div className='navbar-events'>
				<div className='name-events'> ¡Hola {userName}! </div>
				<div className='info-events'>
					<ul>
						<li>
							<Link to='/profile'>
								<a> Perfil</a>
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

			{/* Tabla donde se ven los eventos */}

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
			{/* Contenedor de botones de agregar eventos y nueno mensaje */}
			{userRol === "Afiliado" ? (
				<div></div>
			) : (
				<div className='btnContainer' id='btncont'>
					<div onClick={() => summonAdd()} id='addbtn' className='add-btn'>
						<h1 className='plusign'>
							<strong>+</strong>
						</h1>
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
					{userRol === "Admin" ? (
						<Link to='/admin'>
							<div className='add-btn'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='35'
									height='35'
									fill='currentColor'
									class='bi bi-gear-fill'
									viewBox='0 0 16 16'
								>
									<path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
								</svg>
							</div>
						</Link>
					) : (
						<div className='add-btn'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='35'
								height='35'
								fill='currentColor'
								class='bi bi-emoji-smile'
								viewBox='0 0 16 16'
							>
								<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
								<path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
							</svg>
						</div>
					)}
				</div>
			)}
			{/* Aqui comienza el cuadro emergente de NUEVO EVENTO que aparece al undir el boton '+' */}
			<div id='newEventWindows' className='newEventWindows'>
				<div className='addContent'>
					<div className='firstNewEventRow'>
						<h1>
							<strong>Agregar Evento</strong>
						</h1>
						<div className='closeBtn' onClick={() => closeEvent()}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='40'
								height='40'
								fill='currentColor'
								class='bi bi-x'
								viewBox='0 0 16 16'
							>
								<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
							</svg>
						</div>
					</div>
					<div></div>
					<form>
						<div className='nomcol'>
							<h3>Nombre de Evento:</h3>
							<input
								type='text'
								name='evname'
								onChange={(e) => handleEventForm(e)}
								required
							></input>
						</div>
						<div className='fecharow'>
							<h3>Fecha del Evento:</h3>
							<input
								type='date'
								name='evfecha'
								onChange={(e) => handleEventForm(e)}
								required
							></input>
						</div>
						<div className='fecharow'>
							<h3>Comites invitados:</h3>
						</div>
						<div className='comiteSelect'>
							<div className='labelContainer'>
								<input
									className='inputcom'
									defaultChecked={false}
									name='evsalud'
									onChange={(e) => handleEventForm(e)}
									id='salud'
									type='checkbox'
								></input>
								<label className='labelcom' for='salud'>
									Salud
								</label>
							</div>
							<div className='labelContainer'>
								<input
									className='inputcom'
									defaultChecked={false}
									name='evambiente'
									onChange={(e) => handleEventForm(e)}
									id='ambiente'
									type='checkbox'
								></input>
								<label className='labelcom' for='ambiente'>
									Ambiente
								</label>
							</div>
							<div className='labelContainer'>
								<input
									className='inputcom'
									defaultChecked={false}
									name='evdeporte'
									onChange={(e) => handleEventForm(e)}
									id='deporte'
									type='checkbox'
								></input>
								<label className='labelcom' for='deporte'>
									Deporte
								</label>
							</div>
							<div className='labelContainer'>
								<input
									className='inputcom'
									defaultChecked={false}
									name='evjuventud'
									onChange={(e) => handleEventForm(e)}
									id='juventud'
									type='checkbox'
								></input>
								<label className='labelcom' for='juventud'>
									Juventud
								</label>
							</div>
							<div className='labelContainer'>
								<input
									className='inputcom'
									defaultChecked={false}
									name='evgenero'
									onChange={(e) => handleEventForm(e)}
									id='genero'
									type='checkbox'
								></input>
								<label className='labelcom' for='genero'>
									Genero
								</label>
							</div>
						</div>
						<div className='eventdes'>
							<h3>Descripción del evento:</h3>
						</div>
						<textarea
							rows='5'
							name='evdescrip'
							onChange={(e) => handleEventForm(e)}
							required
						></textarea>
						<div onClick={(e) => btnSubmit(e)} className='btnCont'>
							<button> Agregar</button>
						</div>
					</form>
				</div>
			</div>
			{/* Aqui comienza el cuadro emergente de Mensaje que aparece al undir el boton con el simpolo de buzón */}
			<div id='newMessage' className='newEventWindows'>
				<div className='addContent'>
					<div className='firstNewEventRow'>
						<h1>
							<strong>Enviar Correo Masivo</strong>
						</h1>
						<div className='closeBtn' onClick={() => closemail()}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='40'
								height='40'
								fill='currentColor'
								class='bi bi-x'
								viewBox='0 0 16 16'
							>
								<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
							</svg>
						</div>
					</div>
					<form>
						<div className='nomcol'>
							<h3>Asunto:</h3>
							<input onChange={(e) => handleMessageForm(e)} type='text'></input>
						</div>
						<div className='eventdes'>
							<h3>Cuerpo del Correo:</h3>
						</div>
						<textarea
							onChange={(e) => handleMessageForm(e)}
							rows='5'
						></textarea>
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
							<div className='labelContainer'>
								<input
									className='inputcom'
									id='juventud'
									type='checkbox'
								></input>
								<label className='labelcom' for='juventud'>
									Juventud
								</label>
							</div>
						</div>
						<div onClick={() => btnMessSubmit()} className='btnCont mt-4'>
							<button> Enviar Correo</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
