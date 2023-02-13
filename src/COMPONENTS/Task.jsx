import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
export const Task = ({
  all,
  index,
  deletetask,
  getsingletask,
  completetask,
}) => {
  return (
    <div className={all.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}</b> {all.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble
          color="green"
          onClick={() => {
            completetask(all);
          }}
        />
        <FaEdit
          color="purple"
          onClick={() => {
            getsingletask(all);
          }}
        />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            deletetask(all);
          }}
        />
      </div>
    </div>
  );
};
