import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import ForgotPass from "../login/ForgotPass";
import NewPass from "../login/NewPass";
import Information from "../admin/SideBar";
const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPass />} />
        <Route path="/new/password" element={<NewPass />} />
        <Route path="/admin/information" element={<Information />} />
      </Routes>
    </div>
  );
};

export default MyRoute;
