import React, { useRef, useEffect } from "react";
import { withFirebase } from './Firebase';

const Manager = ({ 
        firebase, 
        setNameStudent, 
        setLastNameStudent, 
        setStudentID, 
        studentID,
        setNumberLessons,
        numberLessons
    }) => {
    const refNameStudent = useRef(null);
    const refLastNameStudent = useRef(null);
    const refNumberLessons = useRef(null);

    const getStudentID = () => {
        firebase.firestore.collection("students")
            .where("name", "==", refNameStudent.current.value)
            .where("lastName", "==", refLastNameStudent.current.value)
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    setNameStudent(doc.data().name);
                    setLastNameStudent(doc.data().lastName);
                    setStudentID(doc.id);
                    setNumberLessons(doc.data().numberLessons);
                })
                
            })
            .catch((err)=>{
                console.log(err)
            })
                
    } 

    const addBalansOfStudent = () => {
        firebase.firestore.collection("students")
            .doc(studentID)
            .set({
                name: refNameStudent.current.value,
                lastName: refLastNameStudent.current.value,
                numberLessons: numberLessons + Number(refNumberLessons.current.value)
            })
    }

    useEffect(()=>{
        if (studentID) addBalansOfStudent();
    }, [numberLessons])

    return  (
        <div>
            <h1 className="p-2">Менеджер</h1>
            <input className="mx-5 my-1" placeholder="Имя" type="text" ref={refNameStudent}/>
            <br />
            <input className="mx-5 my-1" placeholder="Фамилия" type="text" ref={refLastNameStudent}/>
            <br />
            <input className="mx-5 my-1" type="number" alt="количество занятий" ref={refNumberLessons}/>
            <br />
            <button 
                className="btn btn-dark ml-5"
                onClick={()=>getStudentID()}
            >Пополнить баланс</button>
        </div>
    )
}

export default withFirebase(Manager);
