import React, { useRef, useState, useEffect, useContext } from "react";
import CONTEXT from "../constants/CONTEXT";
import { withFirebase } from "./Firebase";

const FormNewStudent = ({ firebase }) => {
  const refNameStudent = useRef(null);
  const refLastNameStudent = useRef(null);
  const refNumberLessons = useRef(null);

  const [notificationManager, setNotificationManager] = useState("");
  const [students, setStudents] = useState([]);

  const { getStudentID, studentID, numberLastPackage, setStudentID, setTableLessons } = useContext(CONTEXT);

  const checkStudent = () => {
    setStudentID("");
    setNotificationManager(
      "Такой студент не найден. Проверьте введенные данные"
    );
  };

  const getAllLessons = () => {
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
              idPackage: doc.data().idPackage,
              lastNameStudent: doc.data().lastNameStudent,
              nameStudent: doc.data().nameStudent,
              dateLesson: doc.data().dateLesson.seconds,
              timeLesson: doc.data().timeLesson
            },
          });
        });
        setTableLessons(arrayLessons);
        setNotificationManager("");
      });
  };


  const filterRows = () => {
    if (refLastNameStudent.current.value && refNameStudent.current.value) {
      firebase.firestore
        .collection("lessons")
        .where("lastNameStudent", "==", refLastNameStudent.current.value.toUpperCase())
        .where("nameStudent", "==", refNameStudent.current.value.toUpperCase())
        .get()
        .then((querySnapshot) => {
          let arrayLessons = [];
          querySnapshot.forEach((doc) => {
            arrayLessons.push({
              id: doc.id,
              lesson: {
                idStudent: doc.data().idStudent,
                idPackage: doc.data().idPackage,
                lastNameStudent: doc.data().lastNameStudent,
                nameStudent: doc.data().nameStudent,
                dateLesson: doc.data().dateLesson.seconds,
                timeLesson: doc.data().timeLesson
              },
            });
          });
          setTableLessons(arrayLessons);
          setNotificationManager("");
          if (!arrayLessons[0]){
            setNotificationManager(
              "Такой студент не найден. Проверьте введенные данные"
            );
          }
        })
        .catch((err)=>{
          console.log(err)
        });
    } else {
      setNotificationManager(
        "Введите Фамилию и Имя студента"
      );
    }
  };


  const createNewStudent = () => {
    if (
      refNameStudent.current.value &&
      refLastNameStudent.current.value &&
      refNumberLessons.current.value
    ) {
      let isHaveStudent = students.some((item) => {
        return (
          item.name === refNameStudent.current.value.trim().toUpperCase() &&
          item.lastName === refLastNameStudent.current.value.trim().toUpperCase()
        );
      });
      if (!isHaveStudent) {
        firebase.firestore
          .collection("students")
          .add({
            name: refNameStudent.current.value.trim().toUpperCase(),
            lastName: refLastNameStudent.current.value.trim().toUpperCase(),
          })
          .then((docRef) => {
            firebase.firestore
              .collection("students")
              .doc(docRef.id)
              .collection("packages")
              .add({
                numberLessons: +refNumberLessons.current.value.trim(),
                volumePackage: +refNumberLessons.current.value.trim(),
                numberPackage: 1
              })
            let allStudents = students;
            allStudents.push({
              name: refNameStudent.current.value.trim().toUpperCase(),
              lastName: refLastNameStudent.current.value.trim().toUpperCase(),
            });
            setStudents(allStudents);
            setNotificationManager("Создан новый студент!");
            setTimeout(() => {
              setNotificationManager("");
            }, 2000);
          })
          .catch((err) => setNotificationManager(err));
      } else {
        setNotificationManager("Такой студент уже существует.");
        setStudentID("");
      }
    } else {
      setNotificationManager("Заполните все поля!");
    }
  };

  useEffect(()=>{
    if (numberLastPackage) {
      const addPackage = () => {
        if (
          refNameStudent.current.value &&
          refLastNameStudent.current.value &&
          refNumberLessons.current.value 
        ) {
          firebase.firestore 
            .collection('students')
            .doc(studentID)
            .collection("packages")
            .add({
                numberLessons: +refNumberLessons.current.value.trim(),
                volumePackage: +refNumberLessons.current.value.trim(),
                numberPackage: numberLastPackage + 1
            })
            .then(()=>{
              setNotificationManager("Добавлен новый пакет")
            })
        } else {
          setNotificationManager("Заполните все поля!");
        }
      }
      addPackage();
    }
  }, [firebase, numberLastPackage])

  useEffect(() => {
    const getAllStudents = () => {
      firebase.firestore
        .collection("students")
        .get()
        .then((snapshot) => {
          let allStudents = [];
          snapshot.forEach((doc) => {
            allStudents.push({
              name: doc.data().name,
              lastName: doc.data().lastName,
            });
          });
          setStudents(allStudents);
        });
    };
    getAllStudents();
  }, [firebase ]);

  return (
    <div className="col-3 my-5">
      <div className="form-manager">
        <input
          className="my-1 input-manager text-center col-12"
          placeholder="Фамилия"
          type="text"
          ref={refLastNameStudent}
        />
        <input
          className="my-1 input-manager text-center col-12"
          placeholder="Имя"
          type="text"
          ref={refNameStudent}
        />
          <input
            className="mr-1 my-1 input-manager text-center col-12"
            type="number"
            placeholder="Баланс"
            alt="количество занятий"
            ref={refNumberLessons}
          />
        <div className="d-flex pr-1"> 
          <button
            className="mt-2 mr-1 btn btn-dark btn-color btn-manager col-6 d-inline"
            onClick={() => createNewStudent()}
          >
            Добавить студента
          </button>
          <button
            className="mt-2 btn btn-dark btn-color btn-manager col-6 d-inline"
            onClick={() => getStudentID(
              refNameStudent.current.value.trim().toUpperCase(),
              refLastNameStudent.current.value.trim().toUpperCase(),
              checkStudent
            )}
          >
            Добавить пакет
          </button>
        </div>
        <div className="d-flex pr-1">
          <button
            className="mt-2 mr-1 btn btn-dark btn-color btn-manager col-6 d-inline"
            onClick={() => filterRows()}
          >
            Фильтровать
          </button>
          <button
            className="mt-2 btn btn-dark btn-color btn-manager col-6 d-inline"
            onClick={() => getAllLessons()}
          >
            Сбросить
          </button>
        </div>
          {notificationManager ? (
            <p className="my-3 text-center notification">{notificationManager}</p>
          ) : (
            ""
          )}
      </div>
    </div>
  );
};

export default withFirebase(FormNewStudent);
