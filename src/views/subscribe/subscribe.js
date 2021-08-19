import "./subscribe.css";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


export default function Subscribe() {
	const history = useHistory()

	const[userdata,setUserData]=useState({nombres:"",apellidos:"",fdn:"",cedula:0,dir:"",email:"",passw:"",passwr:""})


	useEffect(()=>{

		if(userdata.passw !== userdata.passwr){
			document.getElementById('veri').style.visibility="visible";
		}else{
			document.getElementById('veri').style.visibility="hidden"
		}

		if(userdata.nombres === "" || userdata.apellidos === "" || userdata.fdn === "" || userdata.cedula === 0 || userdata.dir === "" || userdata.email === "" || userdata.passw === "" || userdata.passwr === "" || userdata.passw !==userdata.passwr){
			document.getElementById('form-button').style.opacity=0.5;
			document.getElementById('form-button').style.pointerEvents="none";
			console.log("no valido")

		}else{
			document.getElementById('form-button').style.opacity=1;
			document.getElementById('form-button').style.pointerEvents="auto";
			console.log("valido")
		}
	},[userdata])

	const handleChange=(e)=>{
		const {name,value}=e.target;
		setUserData(prevState=>({
			...prevState,
			[name]:value
		}))
	};

	const handleSubmit=(e)=>{
		e.preventDefault();
		axios.post("https://jaceldoradoserver.herokuapp.com/register",userdata)
			.then(res=>{
				console.log(res.data.Status);
				if(res.data.Status) history.push("/");
				
				
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
					<h1>Suscribirse:</h1>

					<form id='subscribeForm'>
						<div className='row'>
							<div className='col-sm-12 col-md-6'>
								<div className='elements'>
									<h3>Nombres:</h3>
									<input type='text' name="nombres" onChange={e=>handleChange(e)} required></input>
								</div>
								<div className='elements'>
									<h3>Apellidos:</h3>
									<input type='text' name="apellidos"  onChange={e=>handleChange(e)} required></input>
								</div>
								<div className='elements'>
									<h3>Fecha de nacimineto:</h3>
									<input type='date' name="fdn" onChange={e=>handleChange(e)} required></input>
								</div>
								<div className='elements'>
									<h3>Cedula:</h3>
									<input type='number' name="cedula" maxLength='15' onChange={e=>handleChange(e)} required></input>
								</div>
							</div>
							<div className='col-sm-12 col-md-6'>
								<div className='elements'>
									<h3>Dirección:</h3>
									<input type='text' name="dir"  onChange={e=>handleChange(e)} required></input>
								</div>
								<div className='elements'>
									<h3>Correo electronico:</h3>
									<input type='email' name="email" onChange={e=>handleChange(e)} required></input>
								</div>
								<div className='elements'>
									<h3>Contraseña:</h3>
									<input type='password' name="passw" min='8' onChange={e=>handleChange(e)} required></input>
								</div>
								<div className='elements'>
									<h3>Repetir constraseña:</h3>
									<input type='password' name="passwr" min='8' onChange={e=>handleChange(e)} required></input>
								</div>
							</div>
						</div>
					</form>
					<div id="veri" className="verification"> Las contraseñas no coinciden </div>
					<button id="form-button" onClick={(e)=>handleSubmit(e)} form="subscribeForm" > Suscribirse</button>
					
				</div>
			</div>
		</div>
	);
}
