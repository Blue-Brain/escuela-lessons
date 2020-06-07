import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
  const [numberLastPackage, setNumberLastPackage] = useState(null);
  const [tableLessons, setTableLessons] = useState([]);

  const getStudentID = (name, lastName, setNotification) => {
    firebase.firestore
      .collection("students")
      .where("name", "==", name)
      .where("lastName", "==", lastName)
      .get()
      .then((querySnapshot) => {
        let id;
        let name;
        let lastName;
        querySnapshot.forEach((doc) => {
          id = doc.id;
          name = doc.data().name;
          lastName = doc.data().lastName;
          
          });
          if (id) {
            setNameStudent(name);
            setLastNameStudent(lastName);
            setStudentID(id);
        } else {
          setNotification();
        }
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  };

  useEffect(()=>{
    const getNumberLastPackage = () => {
      let packages = [];
      let balance = 0;
      firebase.firestore
        .collection("students")
        .doc(studentID)
        .collection("packages")
        .get()
        .then((snapshot)=>{
          snapshot.forEach(
            (doc)=>{
            balance = balance + doc.data().numberLessons;
            packages.push(doc.data().numberPackage)
            console.log("№ пакета " + doc.data().numberPackage + " = " + doc.data().numberLessons)
          })
          setNumberLastPackage(packages.length);
          setNumberLessons(balance);
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    if (studentID) {
      getNumberLastPackage();
    }
  }, [firebase, studentID])

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
        numberLastPackage,
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
