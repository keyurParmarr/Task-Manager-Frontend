import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TaskList } from "./COMPONENTS/TaskList";
import { UserContext } from "./Context";
export const url = process.env.REACT_APP_SERVER_URL;
export const App = () => {
  const { setUsertask, setUserdata, userdata } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      if (!userdata.email) fetchData();
    } else {
      navigate("/");
    }
    async function fetchData() {
      const { data } = await axios.post(`http://localhost:5000/tokenlogin`, {
        token,
      });
      if (data.email) {
        setUserdata({ email: data.email });
        setUsertask(data.tasks);
      } else {
        toast.error("PLEASE LOGIN");
        Cookies.remove("token");
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, []);
  const outbtn = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return (
    <>
      <div className="out-btn" onClick={outbtn}>
        Sign Out
      </div>
      <div className="app">
        <div className="task-container">
          <TaskList />
        </div>
      </div>
    </>
  );
};
