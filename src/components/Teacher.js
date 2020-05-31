import React from "react";

const Teacher = () => {
    const [nameTeacher, setNameTeacher] = useState('');
    const [lastNameTeacher, setLastNameTeacher] = useState('');

    return  (
        <div>
            <h1 className="p-2">Учитель</h1>
            <label className="mx-5"><input className="mr-3"/>Имя</label><br/>
            <label className="mx-5"><input className="mr-3"/>Фамилия</label><br/>
            <button className="btn btn-dark ml-5">Показать</button>
        </div>
    )
}
export default Teacher;
