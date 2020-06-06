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
      <h1 className="p-2">Студент</h1>
      <div>
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
        <button
          className="btn btn-dark ml-5 my-1"
          onClick={() => {
            Table.getStudentID(
              refNameStudent.current.value.trim(),
              refLastNameStudent.current.value.trim(),
              checkStudent
            );
          }}
        >
          Показать
        </button>
      </div>
      {Table.studentID ? (
        <h3 className="mx-5 my-1">
          {Table.nameStudent} {Table.lastNameStudent}, у вас осталось занятий:{" "}
          {Table.numberLessons}
        </h3>
      ) : notificationStudent ? (
        <h3 className="mx-5 my-1">{notificationStudent}</h3>
      ) : (
        ""
      )}
    </>
  );
};

export default withFirebase(Student);
