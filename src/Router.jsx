import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./COMPONENTS/Login";
import { Signup } from "./COMPONENTS/Signup";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
