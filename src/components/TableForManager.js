import React from "react";

import RowLessonManager from "./RowLessonManager";

import { withFirebase } from "./Firebase";

const TableForManager = ({ tableLessons }) => {
  const renderRow = () => {
    let render = tableLessons.map((item) => {
      return (
        <tr valign="bottom" key={item.id}>
          <RowLessonManager
            idLesson ={item.id}
            idStudent={item.lesson.idStudent}
            idPackage={item.lesson.idPackage}
            nameStudent={item.lesson.nameStudent}
            lastNameStudent={item.lesson.lastNameStudent}
            dateLesson={item.lesson.dateLesson}
            timeLesson={item.lesson.timeLesson}
          />
        </tr>
      );
    });
    return render;
  };

  return (
    <div className="col-9">
      <table className="table table-striped">
        <thead>
          <tr>
            <th align="center" scope="col">Дата</th>
            <th align="center" scope="col">Студент</th>
            <th align="center" scope="col">Остаток</th>
            <th align="center" scope="col">Объём пакета</th>
            <th align="center" scope="col">№ пакета</th>
            <th align="center" scope="col"></th>
            <th align="center" scope="col"></th>
            <th align="center" scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </div>
  );
};
export default withFirebase(TableForManager);
