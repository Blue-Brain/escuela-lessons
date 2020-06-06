import React from "react";

import RowLessonManager from "./RowLessonManager";

import { withFirebase } from "./Firebase";

const TableForManager = ({ tableLessons }) => {
  const renderRow = () => {
    let render = tableLessons.map((item) => {
      return (
        <tr key={item.id}>
          <RowLessonManager
            idStudent={item.lesson.idStudent}
            nameStudent={item.lesson.nameStudent}
            lastNameStudent={item.lesson.lastNameStudent}
            dateLesson={item.lesson.dateLesson}
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
            <th scope="col">Дата</th>
            <th scope="col">Студент</th>
            <th scope="col">Количество занятий</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </div>
  );
};
export default withFirebase(TableForManager);
