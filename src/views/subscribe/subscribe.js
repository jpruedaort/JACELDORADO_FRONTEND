import "./subscribe.css";
export default function Subscribe() {
	var element = document.getElementById("starotate");

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
					<form>
						<div className="elements">
							<h3>Nombres:</h3>
							<input type="text" required></input>
						</div>
						<div className="elements">
							<h3>Apellidos:</h3>
							<input type="text" required></input>
						</div>
						<div className="elements">
							<h3>Fecha de nacimineto:</h3>
							<input type="date" required></input>
						</div>
						<div className="elements">
							<h3>Cedula:</h3>
							<input type="number" max="15" required></input>
						</div>
						<div className="elements">
							<h3>Correo electronico:</h3>
							<input type="email"  required></input>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
