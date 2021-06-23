import "./profile.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Profile() {
	const [userName, setUserName] = useState("");
	const [userInfo, setUserInfo]= useState("");
	const [userUpdateInfo, setUserUpdateInfo]= useState("");
	const [updateState,setUpdateState]=useState(true);
	const [saveState,setSaveState]=useState("Guardar")

	//Simbolos para los botonos de actualizacion
	var editSymbol = `<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			fill='currentColor'
			class='bi bi-pencil'
			viewBox='0 0 16 16'
		>
			<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
		</svg>`;

	const loadingSymbol = `<svg
			id="loadingSymbol"
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			fill='currentColor'
			class='bi bi-slash-circle'
			viewBox='0 0 16 16'
		>
			<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
			<path d='M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z' />
		</svg>`;

	const checkSymbol = 
		`<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			fill='currentColor'
			class='bi bi-check2'
			viewBox='0 0 16 16'
		>
			<path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
		</svg>`
	;

	const crossSymbol = (
		`<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			fill='currentColor'
			class='bi bi-exclamation-circle'
			viewBox='0 0 16 16'
		>
			<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
			<path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
		</svg>`
	);

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
				});
		};

		//recuperar la informacion  del usuario/perfil
		const retriveValue = async() => {
			let data = {
				token: localStorage.getItem("auth-token"),
			};
			await axios
				.post("http://localhost:3000/profile", data)
				.then((res)=>{
					setUserInfo(
						{
							name:res.data.nombres,
							apell:res.data.apellidos,
							fdn:res.data.fdn,
							ced:res.data.cedula,
							dir:res.data.dir,
							email:res.data.email,
							rol:res.data.rol
						}
					);
				});
		};


		//se llama la funcion
		name_request();
		retriveValue();
	}, []);

	//Quitar el token de local storage y volvel a la pagina de inicio
	let history = useHistory();
	const logout = () => {
		localStorage.removeItem("auth-token");
		history.push("/");
	};



	//Este cambia el boton de editar a guardar y cancelar, adicionalmente abilita los campos que se pueden editar
	const UpdateProcess = async(e) => {
		setUpdateState(false);
		 var el = document.getElementsByClassName("profileInput");
		 for (var i=0;i<el.length; i++) {
			 if (i!==3){
			el[i].style.pointerEvents="auto";
			el[i].style.border="solid";
			el[i].style.backgroundColor="white";
			 }
		}


			
		
		// let data = {
		// 	email: userEmail,
		// 	fieldName: e.target.name,
		// 	fieldValue: e.target.value,
		// };
		
		//Se hace la solicutud POST
		// await axios.post("http://localhost:3000/profile/update", data).then((res) => {
		// 	console.log("nombre int: ", res.data.payload);
		// 	setUserName(res.data.payload.name);
		// 	setUserEmail(res.data.payload.email);
		// });
		
	};

	//Toma los valores de los diferentes inputs cuando el usuario hace un cambio en cada uno de estos
	const handleChange=(e)=>{
		const {name,value}=e.target;
		setUserUpdateInfo(prevState=>({
			...prevState,
			[name]:value
		}))

		console.log("inputs ", userUpdateInfo)
	};


	//actualiza los valores

	const updateProfile=async()=>{
		//se comienza cambiando el estado en proceso
		setSaveState("Guardando...")
		//se obtienen los valores de los imputs
		var nameVal= document.getElementById("nameBtnInp").value;
		var apeVal= document.getElementById("apeBtnInp").value;
		var fdnVal= document.getElementById("fnBtnInp").value;
		var cedVal= document.getElementById("cedBtnInp").value;
		var dirVal= document.getElementById("dirBtnInp").value;
		var emailVal= document.getElementById("emailBtnInp").value;

		let data = {
			token: localStorage.getItem("auth-token"),
			fields:{
				nombres:nameVal,
				apellidos:apeVal,
				fdn:fdnVal,
				cedula:cedVal,
				dir:dirVal,
				email:emailVal
			}
		};
		await axios.post("http://localhost:3000/profile/update",data)
			.then((res)=>{
				if( res.data.status ==="positive" ){
					setSaveState("Exito");
					setTimeout(() => {
						setSaveState("Guardar");
						setUpdateState(true);
						var el = document.getElementsByClassName("profileInput");
						for (var i=0;i<el.length; i++) {
							if (i!==3){
						   el[i].style.pointerEvents="none";
						   el[i].style.border="none";
						   el[i].style.backgroundColor="rgb(219,219,219)";
							}
					   }
					}, 3000);
				}else if ( res.data.status ==="negative" ) {
					setSaveState("Error");
					setTimeout(() => {
						setSaveState("Guardar");
					}, 3000);
				}
			})

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
					<div className='usudesc'>
								Actualmente estas bajo el rol de  <strong>{userInfo.rol}</strong>
					</div>
				</h1>
				<div className='profrow row'>
					<div className='profcol col-12 col-sm-6'>
						<div className='itemCell'>
							<h4> Nombres: </h4>
							<div className='inputline'>
								<input className="profileInput" onChange={(e)=>handleChange(e)} name="nombres" id="nameBtnInp" defaultValue={userInfo.name} type='text'></input>

							</div>
						</div>
						<div className='itemCell'>
							<h4> Apellidos: </h4>
							<div className='inputline'>
								<input className="profileInput" onChange={(e)=>handleChange(e)} name="apellidos" defaultValue={userInfo.apell} id="apeBtnInp" type='text'></input>
							</div>
						</div>
						<div className='itemCell'>
							<h4> Fecha de nacimineto: </h4>
							<div className='inputline'>
								<input className="profileInput" onChange={(e)=>handleChange(e)} name="fdn" defaultValue={userInfo.fdn} type='date' id="fnBtnInp"></input>
							</div>
						</div>
						<div className='itemCell'>
							<h4> Cedula: </h4>
							<div className='inputline'>
								<input  className="profileInput" onChange={(e)=>handleChange(e)} name="cedula" defaultValue={userInfo.ced} type='text' id="cedBtnInp"></input>
							</div>
						</div>
						<div className='itemCell'>
							<h4>Dirección:</h4>
							<div className='inputline'>
								<input className="profileInput" onChange={(e)=>handleChange(e)} name="dir" defaultValue={userInfo.dir} type='text' id="dirBtnInp"></input>
							</div>
						</div>
					</div>
					<div className='profcol col-12 col-sm-6'>
						<div className='itemCell'>
							<h4> Correo Electronico: </h4>
							<div className='inputline'>
								<input className="profileInput" onChange={(e)=>handleChange(e)} name="email" defaultValue={userInfo.email} type='email' id="emailBtnInp"></input>
							</div>
						</div>
					</div>
				</div>
				<div className="btnRow row">
					{updateState 
					?
					<div className="btncont">
					<button onClick={()=>UpdateProcess()} id="editar"> Editar </button>
					</div>
					:
					<div className="btncont">
					<button onClick={()=>updateProfile()}id="guardar"> {saveState} </button>
					<button id="cancelar"> Cancelar </button>
					</div>
					}
					
				</div>
			</div>
		</div>
	);
}
