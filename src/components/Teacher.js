import React, { useState, useRef, useContext, useEffect } from "react";
import { withFirebase } from "./Firebase";
import CONTEXT from "../constants/CONTEXT";

const Teacher = ({ firebase }) => {
  const refLastNameStudent = useRef(null);
  const refNameStudent = useRef(null);
  const refDateLesson = useRef(null);
  const refTimeLesson = useRef(null);

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
    if (numberLessons && refDateLesson.current.value && refTimeLesson.current.value) {
      const decrementsBalance = () => {
        firebase.firestore
          .collection("students")
          .doc(studentID)
          .set({
            name: refNameStudent.current.value.trim().toUpperCase(),
            lastName: refLastNameStudent.current.value.trim().toUpperCase(),
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
          refDateLesson.current.value && 
          refTimeLesson.current.value
        ) {
          console.log(refTimeLesson.current.value)
          firebase.firestore
            .collection("lessons")
            .add({
              idStudent: studentID,
              lastNameStudent: refLastNameStudent.current.value.trim().toUpperCase(),
              nameStudent: refNameStudent.current.value.trim().toUpperCase(),
              dateLesson: new Date(refDateLesson.current.value),
              timeLesson: refTimeLesson.current.value,
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
    <>
      <h1 className="p-2 text-center my-4">ЗАПИШИТЕ ЗАНЯТИЕ, ПРОВЕДЕННОЕ В ШКОЛЕ ESCUELA</h1>
      <div className="d-flex justify-content-center flex-column">
      <h3 className="mx-5 my-1 text-center">Введите Фамилию и Имя студента, чтобы записать урок</h3>
        <input
          className="my-3 text-center mx-auto"
          placeholder="Фамилия студента"
          type="text"
          ref={refLastNameStudent}
        />
        <br />
        <input
          className="my-3 text-center mx-auto"
          placeholder="Имя студента"
          type="text"
          ref={refNameStudent}
        />
        <br />
        <input 
          className="my-3 text-center mx-auto"
          type="date" 
          ref={refDateLesson} />
        <br />
        <input 
          className="my-3 text-center mx-auto"
          type="time" 
          ref={refTimeLesson} />
        <br />
        <button
          className="btn ml-5 my-4 btn-dark btn-color mx-auto"
          onClick={() =>
            getStudentID(
              refNameStudent.current.value.trim().toUpperCase(),
              refLastNameStudent.current.value.trim().toUpperCase(),
              () => checkStudent()
            )
          }
        >
          Записать урок
        </button>
        {notificationTeacher ? (
          <h3 className="mx-5 my-2 error text-center">{notificationTeacher}</h3>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default withFirebase(Teacher);
