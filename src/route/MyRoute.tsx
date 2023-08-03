import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import ForgotPass from "../login/ForgotPass";
import NewPass from "../login/NewPass";
import Information from "../admin/informaton/Information";
import Dashboard from "../admin/dashboard/Dashboard";
import Device from "../admin/device/Device";
import NewDevice from "../admin/device/addDevice/NewDevice";
import DetailDevice from "../admin/device/detail/DetailDevice";
import UpdateDevice from "../admin/device/update/UpdateDevice";
const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPass />} />
        <Route path="/new/password" element={<NewPass />} />
        <Route path="/admin/information" element={<Information />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/device" element={<Device />} />
        <Route path="/admin/device/add" element={<NewDevice />} />
        <Route path="/admin/device/detail/:id" element={<DetailDevice />} />
        <Route path="/admin/device/update/:id" element={<UpdateDevice />} />
      </Routes>
    </div>
  );
};

export default MyRoute;
