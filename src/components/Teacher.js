import React, { useState, useRef, useContext, useEffect } from "react";
import { withFirebase } from "./Firebase";
import CONTEXT from "../constants/CONTEXT";

const Teacher = ({ firebase }) => {
  const refLastNameStudent = useRef(null);
  const refNameStudent = useRef(null);
  const refDateLesson = useRef(null);

  const [notificationTeacher, setNotificationTeacher] = useState("");

  const Student = useContext(CONTEXT);
  const {
    numberLessons,
    studentID,
    setStudentID,
    setNumberLessons,
    getStudentID,
  } = Student;

  const checkStudent = () =>
    setNotificationTeacher(
      "Такой студент не найден. Проверьте введенные данные"
    );

  useEffect(() => {
    if (numberLessons && refDateLesson.current.value) {
      const decrementsBalance = () => {
        firebase.firestore
          .collection("students")
          .doc(studentID)
          .set({
            name: refNameStudent.current.value.trim(),
            lastName: refLastNameStudent.current.value.trim(),
            numberLessons: +numberLessons - 1,
          });
      };
      decrementsBalance();
    } else {
      setNumberLessons("");
    }
  }, [firebase, numberLessons, setNumberLessons]);

  useEffect(() => {
    if (studentID) {
      const writeLesson = () => {
        if (
          refLastNameStudent.current.value &&
          refNameStudent.current.value &&
          refDateLesson.current.value
        ) {
          firebase.firestore
            .collection("lessons")
            .add({
              idStudent: studentID,
              lastNameStudent: refLastNameStudent.current.value.trim(),
              nameStudent: refNameStudent.current.value.trim(),
              dateLesson: new Date(refDateLesson.current.value),
            })
            .then(() => {
              if (studentID) {
                setNotificationTeacher("Вы успешно записали урок");
                setTimeout(() => {
                  setStudentID("");
                  setNotificationTeacher("");
                }, 2000);
              }
            })
            .catch((err) => setNotificationTeacher(err));
        } else {
          setNotificationTeacher("Заполните все поля");
          setStudentID("");
        }
      };
      writeLesson();
    }
  }, [firebase, studentID, setStudentID]);

  return (
    <div>
      <h1 className="p-2">Учитель</h1>
      <input
        className="mx-5 my-1"
        placeholder="Фамилия студента"
        type="text"
        ref={refLastNameStudent}
      />
      <br />
      <input
        className="mx-5 my-1"
        placeholder="Имя студента"
        type="text"
        ref={refNameStudent}
      />
      <br />
      <input className="mx-5 my-1" type="date" ref={refDateLesson} />
      <br />
      <button
        className="btn btn-dark ml-5"
        onClick={() =>
          getStudentID(
            refNameStudent.current.value.trim(),
            refLastNameStudent.current.value.trim(),
            () => checkStudent()
          )
        }
      >
        Записать урок
      </button>
      {notificationTeacher ? (
        <h3 className="mx-5 my-1">{notificationTeacher}</h3>
      ) : (
        ""
      )}
    </div>
  );
};
export default withFirebase(Teacher);
