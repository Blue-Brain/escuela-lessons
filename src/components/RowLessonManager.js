import React, { useRef, useState, useEffect, useContext } from "react";
import { withFirebase } from "./Firebase";
import CONTEXT from '../constants/CONTEXT';

const RowLessonManager = ({
  firebase,
  idStudent,
  nameStudent,
  lastNameStudent,
  dateLesson,
  timeLesson,
  idPackage,
  idLesson
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

  const { setTableLessons, tableLessons } = useContext(CONTEXT);

  const deleteLesson = () => {
    firebase.firestore
      .collection("students")
      .doc(idStudent)
      .collection("packages")
      .doc(idPackage)
      .update({
        "numberLessons": +studentBalance + 1
      })
      .then(() => {
        setStudentBalance(
          +studentBalance + 1
        );
        firebase.firestore
          .collection("lessons")
          .doc(idLesson)
          .delete()
          .then(()=>{
            let arrayLessons = [...tableLessons];
            let indexLesson = arrayLessons.findIndex(lesson => lesson.id===idLesson);
            arrayLessons.splice(indexLesson, 1);
            setTableLessons(arrayLessons);
          })

        
      })
      .catch((err) => {
        console.log(err)
      });
    
  }
  
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
      <td>
      <button type="button" className="close" aria-label="Close" onClick={()=>deleteLesson()}>
        <span aria-hidden="true">&times;</span>
      </button>
      </td>
    </>
  );
};

export default withFirebase(RowLessonManager);
