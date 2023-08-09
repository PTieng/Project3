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
import Service from "../admin/service/Service";
import AddService from "../admin/service/add/AddService";
import DetailService from "../admin/service/detail/DetailService";
import CapSo from "../admin/capSo/CapSo";
import BaoCao from "../admin/baoCao/BaoCao";
import AddUpdateAccount from "../admin/account/addUpdate/AddUpdateAccount";
import Account from "../admin/account/Account";
import DetailCapSo from "../admin/capSo/detail/DetailCapSo";
import AddCapSo from "../admin/capSo/add/AddCapSo";
import UpdateVaiTro from "../admin/vaiTro/update/UpdateVaiTro";
import VaiTro from "../admin/vaiTro/VaiTro";
import UserLog from "../admin/userLog/UserLog";
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
        <Route path="/admin/device/add/:id" element={<NewDevice />} />
        <Route path="/admin/device/detail/:id" element={<DetailDevice />} />
        <Route path="/admin/service" element={<Service />} />
        <Route path="/admin/service/add" element={<AddService />} />
        <Route path="/admin/service/add/:id" element={<AddService />} />
        <Route path="/admin/service/detail/:id" element={<DetailService />} />
        <Route path="/admin/service/detail" element={<DetailService />} />
        <Route path="/admin/capso" element={<CapSo />} />
        <Route path="/admin/capso/detail/:id" element={<DetailCapSo />} />
        <Route path="/admin/capso/add" element={<AddCapSo />} />
        <Route path="/admin/account" element={<Account />} />
        <Route path="/admin/account/add/:id" element={<AddUpdateAccount />} />
        <Route path="/admin/account/add" element={<AddUpdateAccount />} />
        <Route path="/admin/vaitro" element={<VaiTro />} />
        <Route path="/admin/vaitro/add" element={<UpdateVaiTro />} />
        <Route path="/admin/vaitro/add/:id" element={<UpdateVaiTro />} />
        <Route path="/admin/baocao" element={<BaoCao />} />
        <Route path="/admin/userLog" element={<UserLog />} />
      </Routes>
    </div>
  );
};

export default MyRoute;
