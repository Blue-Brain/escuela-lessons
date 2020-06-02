import React, { useState, useRef } from "react";
import { withFirebase } from "./Firebase";

const Teacher = ({firebase}) => {

  const refLastNameTeacher = useRef(null);
  const refLastNameStudent = useRef(null);
  const refNameStudent = useRef(null);
  const refDataLesson = useRef(null);
  const refComment = useRef(null);

  const [notification, setNotification] = useState('');

  const writeLesson = () => {
    console.log(refDataLesson.current.value)
    if (
      refLastNameTeacher.current.value && 
      refLastNameStudent.current.value && 
      refNameStudent.current.value && 
      refDataLesson.current.value && 
      refComment.current.value
    ) {
      firebase.firestore.collection("lessons")
      .add({
        lastNameTeacher: refLastNameTeacher.current.value,
        lastNameStudent: refLastNameStudent.current.value,
        nameStudent: refNameStudent.current.value,
        dateLesson: new Date(refDataLesson.current.value),
        comment: refComment.current.value,
      })
      .then(()=>setNotification("Вы успешно записали урок"))
      .catch((err)=>setNotification(err))
    } else {
      setNotification("Заполните все поля")
    }
  }

  return (
    <div>
        <h1 className="p-2">Учитель</h1>
        <input className="mx-5 my-1" placeholder="Ваша фамилия" type="text" ref={refLastNameTeacher}/>
        <hr />
        <input className="mx-5 my-1" placeholder="Фамимлия студента" type="text" ref={refLastNameStudent}/>
        <br />
        <input className="mx-5 my-1" placeholder="Имя студента" type="text" ref={refNameStudent}/>
        <br />
        <textarea className="mx-5 my-1" placeholder="  Ваш комментарий" ref={refComment}></textarea>
        <br />
        <input className="mx-5 my-1" type="date" ref={refDataLesson}/>
        <br />
        <button 
          className="btn btn-dark ml-5"
          onClick={()=>writeLesson()}  
        >Записать урок</button>
        {
          notification
            ? <h3 className="mx-5 my-1">{notification}</h3>
            : '' 
        }
    </div>
  );
};
export default withFirebase(Teacher);
