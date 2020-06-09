import React, { useRef, useState, useEffect } from "react";
import { withFirebase } from "./Firebase";

const RowLessonManager = ({
  firebase,
  idStudent,
  nameStudent,
  lastNameStudent,
  dateLesson,
  timeLesson,
  idPackage
}) => {
  const refNumberLessons = useRef(null);
  const [studentBalance, setStudentBalance] = useState(null);
  const [volumePackage, setVolumePackage] = useState(null);
  const [numberPackage, setNumberPackage] = useState(null);
  
  const parseDate = new Date(dateLesson * 1000)
    .toString()
    .split(" ")
    .slice(1, 4)
    .join("/");

  const topUpBalansOfStudent = () => {
    firebase.firestore
      .collection("students")
      .doc(idStudent)
      .collection("packages")
      .doc(idPackage)
      .update({
        "numberLessons": +studentBalance + +refNumberLessons.current.value.trim()
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
        .collection("packages")
        .doc(idPackage)
        .get()
        .then((doc) => {
          setStudentBalance(doc.data().numberLessons);
          setVolumePackage(doc.data().volumePackage);
          setNumberPackage(doc.data().numberPackage);
        });
    };
    getStudentBalance();
  }, [studentBalance, idStudent, firebase]);
  return (
    <>
      <td><p className="p-0 m-0"><b>{parseDate}</b> - {timeLesson}</p></td>
      <td>{`${lastNameStudent} ${nameStudent}`}</td>
      <td align="middle">{studentBalance}</td>
      <td align="middle">{volumePackage}</td>
      <td align="middle">{numberPackage}</td>
      <td>
        <button className="btn btn-dark btn-color btn-manager" onClick={() => topUpBalansOfStudent()}>
          Пополнить баланс
        </button>
      </td>
      <td>
        <input className="input-manager input-row " ref={refNumberLessons} type="number" placeholder="Баланс"/>
      </td>
    </>
  );
};

export default withFirebase(RowLessonManager);
