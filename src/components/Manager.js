import React, { useEffect, useContext } from "react";

import FormNewStudent from "./FormNewStudent.js";
import TableForManager from "./TableForManager";

import { withFirebase } from "./Firebase";
import CONTEXT from "../constants/CONTEXT";

const Manager = ({ firebase }) => {
  const Table = useContext(CONTEXT);

  const { setTableLessons, tableLessons } = Table;
  
  useEffect(() => {
    const getRows = () => {
      firebase.firestore
        .collection("lessons")
        .orderBy("dateLesson", "desc")
        .get()
        .then((querySnapshot) => {
          let arrayLessons = [];
          querySnapshot.forEach((doc) => {
            arrayLessons.push({
              id: doc.id,
              lesson: {
                idStudent: doc.data().idStudent,
                lastNameStudent: doc.data().lastNameStudent,
                nameStudent: doc.data().nameStudent,
                dateLesson: doc.data().dateLesson.seconds,
                timeLesson: doc.data().timeLesson
              },
            });
          });
          setTableLessons(arrayLessons);
        });
    };
    getRows();
  }, [firebase, setTableLessons]);

  return (
    <div>
      <h1 className="p-2">Менеджер</h1>
      <div className="d-flex">
        <TableForManager tableLessons={tableLessons} />
        <FormNewStudent />
      </div>
    </div>
  );
};

export default withFirebase(Manager);
