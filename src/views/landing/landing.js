import "./landing.css";
import { Link, useHistory } from "react-router-dom";
import React, { useState , useEffect} from "react";
import axios from "axios";

export default function Landing() {
	let history = useHistory();

	useEffect(() => {

		
		if(localStorage.getItem("auth-token") !==null) history.push("/eventlog");

	}, )

	const [userData, setUserData] = useState({ email: "", passw: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/auth/useravalidate", userData)
			.then((res) => {
				console.log(res.data.accessToken);
				console.log(res.data.authorized);

				if (res.data.authorized) {
					localStorage.removeItem("auth-token");
					localStorage.setItem("auth-token", res.data.accessToken);
					document.getElementById("incorrecto").style.visibility = "hidden";
					history.push("/eventlog");
				} else {
					localStorage.removeItem("auth-token");
					document.getElementById("incorrecto").style.visibility = "visible";
				}
			});
	};

	return (
		<div className='background'>
			<div className='navbar'>
				<div className='name'>JAC El Dorado</div>
				<div className='info'>
					<ul>
						<li>
							<a href='#'>Informacíon</a>
						</li>
						<li>
							<a href='#'>Contacto</a>
						</li>
					</ul>
				</div>
			</div>
			<div className='login-subscribe container'>
				<div className='inside container'>
					<h1>Iniciar sesión</h1>
					<form>
						<div className='elements'>
							<h3>Usuario</h3>
							<input
								name='email'
								type='email'
								required
								onChange={(e) => handleChange(e)}
							></input>
						</div>
						<div className='elements'>
							<h3>Contraseña</h3>
							<input
								name='passw'
								type='password'
								required
								onChange={(e) => handleChange(e)}
							></input>
						</div>
						<div>
							<p id='incorrecto' className='incorrecto'>
								Usuario o Contraseña Incorrecto
							</p>
						</div>
						<button onClick={(e) => handleSubmit(e)}> Ingresar</button>

						<Link to='/subscribe'>
							<p> No estas registrado aun? Haz click aqui!</p>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
