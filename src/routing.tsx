import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "./App";

export default function Routing () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mazegen">Maze generator</Link>
            </li>
          </ul>
        </nav>

       
        <Switch>
          <Route path="/mazegen">
            <App />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
    return(<h2>Home</h2>)
}