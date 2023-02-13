import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import "./Login.css";
import { url } from "../App";
export const Login = () => {
  const navigate = useNavigate();
  const { setUserdata, setUsertask } = useContext(UserContext);
  const [details, setdetails] = useState({});
  const logindata = async () => {
    const { data } = await axios.post(`${url}/login`, details);
    if (data.msg) {
      return toast.error(data.msg);
    }
    Cookies.set("token", data.token);
    toast.success("logged in successfully");
    setUserdata({ email: data.email });
    setUsertask(data.tasks);
    navigate("/app");
  };

  const inpval = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/app");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="title">
        <h1>Task Manager</h1>
        <button className="signupbtn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
      <div className="box">
        <div className="login-box">
          <h1>LOGIN</h1>
          <label>Email</label>
          <input
            type="text"
            onChange={inpval}
            name="email"
            autoComplete="off"
          />
          <label>Password</label>
          <input type="password" onChange={inpval} name="password" />
          <div className="subbtn">
            <button
              className="login-btn"
              onClick={() => {
                logindata();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
