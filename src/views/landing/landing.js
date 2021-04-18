import "./landing.css";
export default function Landing() {
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
					<h1>LogIn</h1>
					<form>
						<div className='elements'>
							<h3>Usuario</h3>
							<input type="email" required ></input>
						</div>
						<div className='elements'>
							<h3>Contraseña</h3>
							<input type="password" required></input>
						</div>
						<div>
							<p className="incorrecto">Usuario o Contraseña Incorrecto</p>
							
						</div>
						<button> Ingresar</button>
						<p> No estas afiliado aun? Haz click aqui!</p>
					</form>
				</div>
			</div>
		</div>
	);
};
