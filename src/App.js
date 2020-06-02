import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Manager from "./components/Manager.js";
import Student from "./components/Student.js";
import Teacher from "./components/Teacher.js";
import "./App.css";

function App() {
  const [nameTeacher, setNameTeacher] = useState('');
  const [lastNameTeacher, setLastNameTeacher] = useState('');
  const [teacherID, setTeacherID] = useState('')
  const [nameStudent, setNameStudent] = useState('');
  const [lastNameStudent, setLastNameStudent] = useState('');
  const [numberLessons, setNumberLessons] = useState('');
  const [studentID, setStudentID] = useState('');
  const [lessonID, setLessonID] = useState('');

  return (
    <Router>
      <Switch>
        <Route
          exact path="/"
          render={() => (
            <>
              <ul className="nav nav-bar">
                <li className="m-3"><Link to="/manager">Manager</Link></li>
                <li className="m-3"><Link to="/student">Student</Link></li>
                <li className="m-3"><Link to="/teacher">Teacher</Link></li>
              </ul>
            </>
          )}
        />
        <Route path="/manager" render ={
            ()=><Manager 
              nameStudent={nameStudent} setNameStudent={setNameStudent}
              lastNameStudent={lastNameStudent} setLastNameStudent={setLastNameStudent}
              studentID={studentID} setStudentID={setStudentID}
              numberLessons={numberLessons} setNumberLessons={setNumberLessons}
            />
          } />
        <Route path="/student" render ={
            ()=><Student />
          } />
        <Route path="/teacher" render ={
            ()=><Teacher />
          } />
      </Switch>
    </Router>
  );
}

export default App;
