import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Manager from "./components/Manager.js";
import Student from "./components/Student.js";
import Teacher from "./components/Teacher.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path="/"
          render={() => (
            <div >
              <ul className="nav nav-bar">
                <li className="m-3"><Link to="/manager">Manager</Link></li>
                <li className="m-3"><Link to="/student">Student</Link></li>
                <li className="m-3"><Link to="/teacher">Teacher</Link></li>
              </ul>
            </div>
          )}
        />
        <Route path="/manager" component={Manager} />
        <Route path="/student" component={Student} />
        <Route path="/teacher" component={Teacher} />
      </Switch>
    </Router>
  );
}

export default App;
