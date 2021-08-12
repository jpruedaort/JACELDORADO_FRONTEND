import "./adminPage.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { findAllInRenderedTree } from "react-dom/cjs/react-dom-test-utils.production.min";

export default function AdminPage() {
	//variables
	const [userList, setUserList] = useState([]);
	const [cedulaSelect,setCedulaSelect]=useState(0);
	const [boxChecked,setBoxChecked]=useState({salud:false, ambiente:false , deporte:false, genero:false, juventud:false });
	const [comiteWindow,setComiteWindow] =useState(false);

	//Quitar el token de local storage y volvel a la pagina de inicio
	let history = useHistory();
	const logout = () => {
		localStorage.removeItem("auth-token");
		history.push("/");
	};

	// Requerir los datos para la primera tabla
	const getdata = () => {
		let data = {
			token: localStorage.getItem("auth-token"),
		};
		axios
			.post(" http://localhost:3000/admin/complete", data)
			.then((res) => setUserList(res.data));
	};

	useEffect(() => {
		setUserList([]);
		getdata();
	}, []);

	//eliminar usuario

	const deleteUser = (i) => {
		if (window.confirm(`Eliminar usuario con ID: ${i}`)) {
			const delUser = () => {
				let data = {
					token: localStorage.getItem("auth-token"),
					ced: i,
				};
				axios.post("http://localhost:3000/admin/delUser", data);
			};
			delUser();
			getdata();
		}
	};

	//Actualizar rol de Usuario
	const updateUserRol = (e, ced) => {
		console.log("up: ", e.target.value, " cedula ", ced);
		var updConfirm = window.confirm(`¿Cambiar rol a ${e.target.value}?`);
		let data = {
			token: localStorage.getItem("auth-token"),
			rol: e.target.value,
			ced: ced,
		};
		if (updConfirm) {
			axios
				.post("http://localhost:3000/admin/upDate", data)
				.then((res) => alert(JSON.stringify(res.data)));
		} else {
			getdata();
		}
	};

	//Abrir la ventana para ver comites

	const openComite = (ced) => {
		let data = {
			token: localStorage.getItem("auth-token"),
			ced: ced
		};
		axios.post("http://localhost:3000/admin/cominfo",data)
			.then((res)=>{
				const resArray = Object.values(res.data);
				console.log("length: ", resArray);
				for(let i=0; i<resArray.length;i++){
					console.log(resArray[i].comite_id)
					if(resArray[i].comite_id === 1){
						setBoxChecked((prevState) => ({
							...prevState,
							salud: true,
						}));
					}
					if(resArray[i].comite_id === 2){
						setBoxChecked((prevState) => ({
							...prevState,
							ambiente: true,
						}));
					}
					if(resArray[i].comite_id === 3){
						setBoxChecked((prevState) => ({
							...prevState,
							deporte: true,
						}));;
					}
					if(resArray[i].comite_id === 4){
						setBoxChecked((prevState) => ({
							...prevState,
							juventud: true,
						}));
					}
					if(resArray[i].comite_id === 5){
						setBoxChecked((prevState) => ({
							...prevState,
							genero: true,
						}));
					}
				}
				console.log("loq  :" , boxChecked)
			}
			);
		
		
		setCedulaSelect(ced);
		setComiteWindow(true);
	};

	//registrar los cambios en los checkboxes

	const checkBoxHandle=(e)=>{
		const boxName = e.target.name;
		const boxValue= e.target.checked;
		console.log("valores " , boxName , "valor" , boxValue);

		let data = {
			token: localStorage.getItem("auth-token"),
			ced: cedulaSelect,
			boxName: boxName,
			boxValue: boxValue

		};
		axios.post("http://localhost:3000/admin/changecomi",data)
			.then(res=>{
				alert(JSON.stringify(res.data))
			})
	};

	//cerrar ventanan de seleccion de comite 

	const quitComWind=()=>{
		
		setComiteWindow(false);
		setBoxChecked({});
	}

	return (
		<div className='adminCont'>
			<div className='navbar-events'>
				<div className='name-events'> Administrador</div>
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

			<div className='results'>
				<table className='table-events'>
					<thead>
						<tr>
							<th>Cedula</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Email</th>
							<th>Rol</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user) => (
							<tr key={user.cedula}>
								<td> {user.cedula}</td>
								<td> {user.nombres}</td>
								<td> {user.apellidos}</td>
								<td> {user.email}</td>
								<td>
									{" "}
									<select
										onChange={(e) => {
											updateUserRol(e, user.cedula);
										}}
									>
										<option
											value='Lider'
											selected={user.rol === "Lider" ? "selected" : ""}
										>
											{" "}
											Lider{" "}
										</option>
										<option
											value='Afiliado'
											selected={user.rol === "Afiliado" ? "selected" : ""}
										>
											Afiliado
										</option>
										<option
											value='Admin'
											selected={user.rol === "Admin" ? "selected" : ""}
											disabled
										>
											Admin
										</option>
									</select>
								</td>
								<td>
									{" "}
									<div
										onClick={() => deleteUser(user.cedula)}
										className='btn bg-danger'
									>
										{" "}
										Eliminar{" "}
									</div>
									<div
										onClick={() => openComite(user.cedula)}
										className='btn bg-primary ml-2'
									>
										{" "}
										Ver Comites{" "}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{comiteWindow ? 			
			
			<div className='comitePopup' >
				<div className="ml-4 mr-4">
					<h1>Seleccionar Comites para ID: {cedulaSelect} </h1>
				</div>
				<div className='comiteSelect'>
					<div className='labelContainer'>
						<input className='inputcom' id='salud' name='1' type='checkbox' defaultChecked={boxChecked.salud} onChange={(e)=>checkBoxHandle(e)}></input>
						<label className='labelcom' for='salud'>
							Salud
						</label>
					</div>
					<div className='labelContainer'>
						<input className='inputcom' id='ambiente' name='2' type='checkbox' defaultChecked={boxChecked.ambiente}  onChange={(e)=>checkBoxHandle(e)} ></input>
						<label className='labelcom' for='ambiente'>
							Ambiente
						</label>
					</div>
					<div className='labelContainer'>
						<input className='inputcom' id='deporte' name='3' type='checkbox' defaultChecked={boxChecked.deporte} onChange={(e)=>checkBoxHandle(e)} ></input>
						<label className='labelcom' for='deporte'>
							Deporte
						</label>
					</div>
					<div className='labelContainer'>
						<input className='inputcom' id='genero' name='5' type='checkbox' defaultChecked={boxChecked.genero}  onChange={(e)=>checkBoxHandle(e)}  ></input>
						<label className='labelcom' for='genero'>
							Genero
						</label>
					</div>
					<div className='labelContainer'>
						<input className='inputcom' id='juventud' name='4' type='checkbox' defaultChecked={boxChecked.juventud} onChange={(e)=>checkBoxHandle(e)} ></input>
						<label className='labelcom' for='juventud'>
							Juventud
						</label>
					</div>
				</div>
				<div className="btnLine">
					<div onClick={()=>quitComWind()} className="btn bg-primary mb-2 text-white"> Aceptar</div>
				</div>
			</div> :<div></div> }

		</div>
	);
}
