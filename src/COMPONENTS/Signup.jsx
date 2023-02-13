import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import Cookies from "js-cookie";
export const Signup = () => {
  const navigate = useNavigate();
  const { setUserdata } = useContext(UserContext);
  const [details, setdetails] = useState({});
  const signupdata = async () => {
    const { data } = await axios.post(`http://localhost:5000/signup`, details);
    if (data.msg) {
      return toast.error(data.msg);
    }
    Cookies.set("token", data.token);
    toast.success("signed up successfully");
    setUserdata(data);
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
        <button className="loginnavbtn" onClick={() => navigate("/")}>
          Login
        </button>
      </div>

      <div className="box">
        <div className="login-box">
          <h1>SIGNUP</h1>
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
                signupdata();
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
