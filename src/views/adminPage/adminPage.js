import "./adminPage.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AdminPage() {
	//variables
	const [userList, setUserList] = useState([]);

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
            .post("http://localhost:3000/admin/complete", data)
            .then((res) => setUserList(res.data));
    };

	useEffect(() => {
        setUserList([]);
        getdata();
	}, []);

	//eliminar usuario

	const deleteUser = (i) => {
		console.log("por aqui paso wey");
		console.log(i);
        const delUser = () => {
			let data = {
				token: localStorage.getItem("auth-token"),
                ced: i
			};
			axios
				.post("http://localhost:3000/admin/delUser", data)
		};
        delUser();
        getdata();
	};


	//Actualizar rol de Usuario
	const updateUserRol =(e,ced)=>{
		console.log("up: " , e.target.value , " cedula ", ced)
		var updConfirm=window.confirm(`¿Cambiar rol a ${e.target.value}?`);
		let data = {
			token: localStorage.getItem("auth-token"),
			rol: e.target.value,
			ced:ced
		};
		if(updConfirm){
			axios
			.post("http://localhost:3000/admin/upDate", data)
				.then(
					(res)=>alert(JSON.stringify(res.data))
			)
		}else{
			getdata();
		}
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
			<div className='searchby '>
				<h2>Filtrar por:</h2>
				<div>
					<input type='radio' value='Male' name='gender' /> Cedula
					<input type='radio' value='Female' name='gender' /> Nombre
					<input type='radio' value='Other' name='gender' /> Apellido
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
								<td> <select onChange={(e)=>{updateUserRol(e,user.cedula)}}>
                                    <option value="Lider" selected={(user.rol==="Lider") ?"selected" : ""} > Lider </option>
                                    <option value="Afiliado" selected={(user.rol==="Afiliado") ?"selected" :""} >Afiliado</option>
									<option value="Admin" selected={(user.rol==="Admin") ?"selected" :""} disabled >Admin</option>
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
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
