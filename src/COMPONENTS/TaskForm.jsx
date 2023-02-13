import React from "react";

export const TaskForm = ({
  createtask,
  name,
  inpval,
  updatetask,
  edittext,
}) => {
  return (
    <form className="task-form" onSubmit={edittext ? updatetask : createtask}>
      <input
        type="text"
        placeholder="Add a task"
        name="name"
        value={name}
        onChange={inpval}
      />
      <button type="submit">{edittext ? "EDIT" : "ADD"}</button>
    </form>
  );
};
