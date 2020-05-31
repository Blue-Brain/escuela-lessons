import React, { useState }  from "react";
import { withFirebase } from './Firebase';

const Student = () => {
    const [nameStudent, setNameStudent] = useState('');
    const [lastNameStudent, setLastNameStudent] = useState('');

    return  (
        <div>
            <h1 className="p-2">Студент</h1>
            <label className="mx-5"><input className="mr-3"/>Имя</label><br/>
            <label className="mx-5"><input className="mr-3"/>Фамилия</label><br/>
            <button className="btn btn-dark ml-5">Показать</button>
        </div>
    )
}

export default withFirebase(Student);
