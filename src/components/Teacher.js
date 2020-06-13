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

  const clearNotification = () => {
    setNotificationTeacher("")
  }

  const checkStudent = () =>
    setNotificationTeacher(
      "Такой студент не найден. Проверьте введенные данные"
    );

  useEffect (()=>{
    if (numberLessons===0) {
      setNotificationTeacher("У этого студента кончились занятия, необходимо пополнить");
    }
  }, [numberLessons])

  useEffect(() => {
    const writeLesson = (idPackage) => {
      setNotificationTeacher("Обрабтка данных... ждите!");
      firebase.firestore
        .collection("lessons")
        .add({
          idStudent: studentID,
          idPackage: idPackage,
          lastNameStudent: refLastNameStudent.current.value.trim().toUpperCase(),
          nameStudent: refNameStudent.current.value.trim().toUpperCase(),
          dateLesson: new Date(refDateLesson.current.value),
          timeLesson: refTimeLesson.current.value,
        })
        .then(() => {
          if (studentID) {
            setNotificationTeacher("Вы успешно записали урок");
            setTimeout(() => {
                setNotificationTeacher("");
              }, 4000);
    
          } else {
          }
        })
        .catch((err) => setNotificationTeacher(err));
    };

    if (studentID) {
      if (refDateLesson.current.value && refTimeLesson.current.value) {
        const decrementsBalance = () => {
          firebase.firestore
            .collection("students")
            .doc(studentID)
            .collection("packages")
            .where("numberLessons", ">", 0)
            .orderBy("numberLessons")
            .limit(1)
            .get()
            .then((snapshot)=>{
              snapshot.forEach((doc) => {
                if (doc.id) {
                  firebase.firestore
                    .collection("students")
                    .doc(studentID)
                    .collection("packages")
                    .doc(doc.id)
                    .update({
                      "numberLessons":  doc.data().numberLessons - 1
                    })
                    .then(()=>{
                      writeLesson(doc.id)
                    })
                    .catch((err)=>{
                      console.log(err)
                    })
                } else {
                  // setNotificationTeacher("У этого студента кончились занятия, необходимо пополнить");
                }
                })
            })
            .catch((err)=>{
              console.log(err)
            })
        };
        decrementsBalance();
     
      } else {
        setNotificationTeacher("Заполните все поля");
        setStudentID("");
        // setNumberLessons("");
      }
    }
  }, [firebase, studentID, setNumberLessons, setStudentID]);

  

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
        <input
          className="my-3 text-center mx-auto"
          placeholder="Имя студента"
          type="text"
          ref={refNameStudent}
        />
        <input 
          className="my-3 text-center mx-auto"
          type="date" 
          ref={refDateLesson} />
        <input 
          className="my-3 text-center mx-auto"
          type="time" 
          ref={refTimeLesson} />
        <button
          className="btn ml-5 my-4 btn-dark btn-color mx-auto"
          onClick={() =>
            getStudentID(
              refNameStudent.current.value.trim().toUpperCase(),
              refLastNameStudent.current.value.trim().toUpperCase(),
              () => checkStudent(),
              () => clearNotification()
            )
          }
        >
          Записать урок
        </button>
        {notificationTeacher ? (
          <h3 className="mx-5 my-2 notification text-center">{notificationTeacher}</h3>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default withFirebase(Teacher);
