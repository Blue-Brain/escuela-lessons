import React, { useState } from "react";
import { withFirebase } from './Firebase';

const Manager = () => {
    return  (
        <div>
            <h1 className="p-2">Менеджер</h1>
            <input className="mx-5 my-1" placeholder="Имя" type="text" />
            <br />
            <input className="mx-5 my-1" placeholder="Фамилия" type="text" />
            <br />
            <input className="mx-5 my-1" type="number" alt="количество занятий" />
            <br />
            <button className="btn btn-dark ml-5">Пополнить баланс</button>
        </div>
    )
}

export default withFirebase(Manager);
