import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Manager from "./components/Manager.js";
import Student from "./components/Student.js";
import Teacher from "./components/Teacher.js";

import { withFirebase } from "./components/Firebase";
import CONTEXT from "./constants/CONTEXT.js";
import "./App.css";

function App({ firebase }) {
  const [nameStudent, setNameStudent] = useState("");
  const [lastNameStudent, setLastNameStudent] = useState("");
  const [numberLessons, setNumberLessons] = useState(null);
  const [studentID, setStudentID] = useState(null);
  const [tableLessons, setTableLessons] = useState([]);

  const getStudentID = (name, lastName, setNotification) => {
    firebase.firestore
      .collection("students")
      .where("name", "==", name)
      .where("lastName", "==", lastName)
      .get()
      .then((querySnapshot) => {
        let id, balance, name, lastName;
        querySnapshot.forEach((doc) => {
          id = doc.id;
          balance = doc.data().numberLessons;
          name = doc.data().name;
          lastName = doc.data().lastName;
        });
        if (id) {
          setNameStudent(name);
          setLastNameStudent(lastName);
          setStudentID(id);
          setNumberLessons(balance);
        } else {
          setNotification();
        }
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  };

  return (
    <CONTEXT.Provider
      value={{
        nameStudent,
        setNameStudent,
        lastNameStudent,
        setLastNameStudent,
        numberLessons,
        setNumberLessons,
        studentID,
        setStudentID,
        tableLessons,
        setTableLessons,
        getStudentID,
      }}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                {/* <ul className="nav nav-bar">
                  <li className="m-3">
                    <Link to="/manager">Manager</Link>
                  </li>
                  <li className="m-3">
                    <Link to="/student">Student</Link>
                  </li>
                  <li className="m-3">
                    <Link to="/teacher">Teacher</Link>
                  </li>
                </ul> */}
              </>
            )}
          />
          <Route
            path="/manager"
            render={() => (
              <div>
                <Manager
                  nameStudent={nameStudent}
                  setNameStudent={setNameStudent}
                  lastNameStudent={lastNameStudent}
                  setLastNameStudent={setLastNameStudent}
                  studentID={studentID}
                  setStudentID={setStudentID}
                  numberLessons={numberLessons}
                  setNumberLessons={setNumberLessons}
                  tableLessons={tableLessons}
                  setTableLessons={setTableLessons}
                />
              </div>
            )}
          />
          <Route path="/student" render={() => <Student />} />
          <Route path="/teacher" render={() => <Teacher />} />
        </Switch>
      </Router>
    </CONTEXT.Provider>
  );
}

export default withFirebase(App);
