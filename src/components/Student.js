import React, { useState, useContext, useRef } from "react";
import CONTEXT from "../constants/CONTEXT";
import { withFirebase } from "./Firebase";

const Student = () => {
  const Table = useContext(CONTEXT);

  const refLastNameStudent = useRef(null);
  const refNameStudent = useRef(null);

  const [notificationStudent, setNotificationStudent] = useState("");

  const checkStudent = () => {
    Table.setStudentID("");
    setNotificationStudent(
      "Такой студент не найден. Проверьте введенные данные"
    );
  };

  return (
    <>
      <h1 className="p-2 text-center my-4">УЗНАЙ, СКОЛЬКО УРОКОВ ОСТАЛОСЬ В ШКОЛЕ</h1>
      <div className="d-flex justify-content-center flex-column">
        <h3 className="mx-5 my-1 text-center">Введите Фамилию и Имя, чтобы узнать ваш текущий баланс</h3>
        <input
          className="mx-5 my-4 text-center mx-auto"
          placeholder="Фамилия"
          type="text"
          ref={refLastNameStudent}
        />
        <br />
        <input
          className="mx-5 my-2 text-center mx-auto"
          placeholder="Имя"
          type="text"
          ref={refNameStudent}
        />
        <br />
        <button
          className="btn ml-5 my-4 btn-dark btn-color mx-auto"
          onClick={() => {
            Table.getStudentID(
              refNameStudent.current.value.trim().toUpperCase(),
              refLastNameStudent.current.value.trim().toUpperCase(),
              checkStudent
            );
          }}
        >
          Показать
        </button>
      </div>  
      {Table.studentID ? (
        <h3 className="mx-5 my-4 text-center">
          {Table.nameStudent} {Table.lastNameStudent}, у вас осталось занятий:{" "}
          {Table.numberLessons}
        </h3>
      ) : notificationStudent ? (
        <h4 className="mx-5 my-2 notification text-center">{notificationStudent}</h4>
      ) : (
        ""
      )}
    </>
  );
};

export default withFirebase(Student);
