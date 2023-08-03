import React from "react";
import "../service/service.css";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
const Service = () => {
  return (
    <div>
      <div className="background-service">
        <SideBar />
        <Header
          firstTitle="Dịch vụ"
          secondTitle="Danh sách dịch vụ"
          firtsPath="/admin/service"
        />
      </div>
    </div>
  );
};

export default Service;
