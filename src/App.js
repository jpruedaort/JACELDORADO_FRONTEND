import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './views/landing/landing';
import Subscribe from './views/subscribe/subscribe';
import EventLog from './views/eventlog/eventlog';
import AddEvent from './views/addEvent/addEvent';

export default function App() {
	return (
		<Router>
			<Route exact path='/' component={()=><Landing/>}/>
			<Route exact path='/subscribe' component={()=><Subscribe/>}/>
			<Route exact path='/eventlog' component={()=><EventLog/>}/>
			<Route exact path='/addevent' component={()=><AddEvent/>}/>
		</Router>

	);
}
