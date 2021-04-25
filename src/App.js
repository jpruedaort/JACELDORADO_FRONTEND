import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './views/landing/landing'
import Subscribe from './views/subscribe/subscribe'
import EventLog from './views/eventlog/eventlog'

export default function App() {
	return (
		<Router>
			<Route exact path='/' component={()=><Landing/>}/>
			<Route exact path='/subscribe' component={()=><Subscribe/>}/>
			<Route exact path='/eventlog' component={()=><EventLog/>}/>
		</Router>

	);
}
