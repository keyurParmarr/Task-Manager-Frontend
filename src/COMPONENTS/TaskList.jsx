import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Task } from "./Task";
import { url } from "../App";
import { TaskForm } from "./TaskForm";
import { toast } from "react-toastify";
import { UserContext } from "../Context";
export const TaskList = () => {
  const [inpdata, setinpdata] = useState({
    name: "",
    completed: false,
  });
  const [edittext, setedittext] = useState(false);
  const [taskid, setTaskid] = useState("");
  const [completedNo, setcompletedNo] = useState(false);
  const { name } = inpdata;
  const { userdata, usertask, setUsertask } = useContext(UserContext);
  const inpval = (e) => {
    const { name, value } = e.target;
    setinpdata({ ...inpdata, [name]: value });
  };
  const createtask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("name can't be empty");
    }
    try {
      const { email } = userdata;
      usertask.push({ ...inpdata });
      const { data } = await axios.post(`${url}/api/tasks`, {
        tasks: usertask,
        email,
      });
      setUsertask(data.tasks);
      toast.success("Task added");
      setinpdata({
        name: "",
        completed: false,
      });
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const deletetask = async (all) => {
    try {
      const { email } = userdata;
      const newtasks = usertask.filter((singletask) => {
        return singletask._id !== all._id;
      });
      const { data } = await axios.post(`${url}/api/tasks/${email}`, {
        newtasks,
      });
      setUsertask(data.tasks);
      toast.warning("Task deleted");
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };
  const getsingletask = async (data) => {
    setinpdata({ name: data.name, completed: false });
    setedittext(true);
    setTaskid(data._id);
  };
  const updatetask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("input field can't be empty");
    }
    try {
      const details = inpdata;
      details.id = taskid;
      const { data } = await axios.put(
        `${url}/api/tasks/${userdata.email}`,
        details
      );

      setinpdata({ ...inpdata, name: "" });
      setedittext(false);
      setUsertask(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  const completetask = async (task) => {
    try {
      const { data } = await axios.put(`${url}/api/tasks/${userdata.email}`, {
        id: task._id,
      });
      setUsertask(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const comptask = usertask.filter((task) => {
      return task.completed === true;
    });
    setcompletedNo(comptask);
  }, [usertask]);

  return (
    <div>
      <h2 className="title">Task Manager</h2>
      <TaskForm
        name={name}
        inpval={inpval}
        createtask={createtask}
        edittext={edittext}
        updatetask={updatetask}
      />
      {usertask.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {usertask.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedNo.length}
          </p>
        </div>
      )}
      <hr />
      {<div className="--flex-center"></div>}

      {usertask.length === 0 ? (
        <p>NO task added</p>
      ) : (
        <>
          {usertask.map((all, index) => {
            return (
              <Task
                key={index}
                all={all}
                index={index}
                deletetask={deletetask}
                getsingletask={getsingletask}
                completetask={completetask}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
