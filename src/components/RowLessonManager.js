import React, { useRef, useState, useEffect } from "react";
import { withFirebase } from "./Firebase";

const RowLessonManager = ({
  firebase,
  idStudent,
  nameStudent,
  lastNameStudent,
  dateLesson,
}) => {
  const refNumberLessons = useRef(null);
  const [studentBalance, setStudentBalance] = useState(null);
  
  const parseDate = new Date(dateLesson * 1000)
    .toString()
    .split(" ")
    .slice(1, 4)
    .join("/");

  const topUpBalansOfStudent = () => {
    firebase.firestore
      .collection("students")
      .doc(idStudent)
      .set({
        name: nameStudent,
        lastName: lastNameStudent,
        numberLessons: +studentBalance + +refNumberLessons.current.value.trim(),
      })
      .then(() => {
        setStudentBalance(
          +studentBalance + +refNumberLessons.current.value.trim()
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getStudentBalance = () => {
      firebase.firestore
        .collection("students")
        .doc(idStudent)
        .get()
        .then((doc) => {
          setStudentBalance(doc.data().numberLessons);
        });
    };
    getStudentBalance();
  }, [studentBalance, idStudent, firebase]);
  return (
    <>
      <td>{parseDate}</td>
      <td>{`${lastNameStudent} ${nameStudent}`}</td>
      <td>{studentBalance}</td>
      <td>
        <button className="btn btn-dark" onClick={() => topUpBalansOfStudent()}>
          Пополнить баланс
        </button>
      </td>
      <td>
        <input ref={refNumberLessons} type="number" />
      </td>
    </>
  );
};

export default withFirebase(RowLessonManager);
