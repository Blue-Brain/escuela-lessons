import React, { useRef, useState, useEffect } from "react";
import { withFirebase } from "./Firebase";

const FormNewStudent = ({ firebase }) => {
  const refNameStudent = useRef(null);
  const refLastNameStudent = useRef(null);
  const refNumberLessons = useRef(null);
  
  const [notificationManager, setNotificationManager] = useState("");
  const [students, setStudents] = useState([]);

  
  const createNewStudent = () => {
    if (refNameStudent.current.value && refLastNameStudent.current.value && refNumberLessons.current.value) {
        let isHaveStudent = students.some((item)=>{
            return item.name === refNameStudent.current.value.trim() && item.lastName === refLastNameStudent.current.value.trim()
        }) 
        if (!isHaveStudent) {
            firebase.firestore
            .collection("students")
            .add({
                name: refNameStudent.current.value.trim(),
                lastName: refLastNameStudent.current.value.trim(),
                numberLessons: +refNumberLessons.current.value.trim(),
            })
            .then(() => {
                setNotificationManager("Создан новый студент!");
                setTimeout(()=>{
                    setNotificationManager("");
                }, 2000)
            })
            .catch((err) => setNotificationManager(err));
        } else {
        setNotificationManager("Такой студент уже существует.")
        }
    } else {
        setNotificationManager("Заполните все поля!")
    }
  };

  useEffect(()=>{
    const getAllStudents = () => {
        firebase.firestore
            .collection("students")
            .get()
            .then((snapshot)=>{
                let allStudents = [];
                snapshot.forEach((doc)=>{
                    allStudents.push({
                        name: doc.data().name,
                        lastName: doc.data().lastName,
                    })
                })
                setStudents(allStudents);
            })
      }
      getAllStudents();
  }, [ firebase ])

  return (
    <div className="col-3 my-5">
      <input
        className="mx-5 my-1"
        placeholder="Фамилия"
        type="text"
        ref={refLastNameStudent}
      />
      <br />
      <input
        className="mx-5 my-1"
        placeholder="Имя"
        type="text"
        ref={refNameStudent}
      />
      <br />
      <input
        className="mx-5 my-1"
        type="number"
        alt="количество занятий"
        ref={refNumberLessons}
      />
      <br />
      <button className="btn btn-dark ml-5" onClick={() => createNewStudent()}>
        Добавить студента
      </button>
      {notificationManager ? (
        <h3 className="mx-5 my-1">{notificationManager}</h3>
      ) : (
        ""
      )}
    </div>
  );
};

export default withFirebase(FormNewStudent);
