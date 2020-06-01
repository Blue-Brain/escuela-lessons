import React, { useState } from "react";
import { withFirebase } from "./Firebase";

const Teacher = () => {

  return (
    <div>
        <h1 className="p-2">Учитель</h1>
        <input className="mx-5 my-1" placeholder="Имя" type="text"/>
        <br />
        <input className="mx-5 my-1" placeholder="Фамилия" type="text"/>
        <br />
        <textarea className="mx-5 my-1" placeholder="  Ваш комментарий"></textarea>
        <br />
        <input className="mx-5 my-1" type="date"/>
        <br />
        <button className="btn btn-dark ml-5">Записать урок</button>
    </div>
  );
};
export default withFirebase(Teacher);
