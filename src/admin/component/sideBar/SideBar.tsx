import React, { useState } from "react";
import "../../component/sideBar/sideBar.css";
import logoAlta from "../../../images/Logo alta.png";
import dashboard from "../../../images/dashboard.png";
import monitor from "../../../images/monitor.png";
import service from "../../../images/service.png";
import number from "../../../images/number.png";
import report from "../../../images/report.png";
import setting from "../../../images/setting.png";
import vertical from "../../../images/fi_more-vertical.png";
import logOut from "../../../images/logOut.png";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLinkDashboard = () => {
    navigate("/admin/dashboard");
  };
  const handleLinkDevice = () => {
    navigate("/admin/device");
  };
  const handleLinkService = () => {
    navigate("/admin/service");
  };
  const [showArrow, setShowArrow] = useState(false);

  const handleSettingMouseEnter = () => {
    setShowArrow(true);
  };

  const handleSettingMouseLeave = () => {
    setShowArrow(false);
  };

  return (
    <div>
      <div className="sideBar">
        <img src={logoAlta} alt="" className="logo" />

        <div
          className="dashboard"
          onClick={handleLinkDashboard}
          style={{ cursor: "pointer" }}
        >
          <img src={dashboard} alt="" className="icon-dashboard" />
          <p
            className="title-dashboard"
            onClick={handleLinkDashboard}
            style={{ cursor: "pointer" }}
          >
            Dashboard
          </p>
        </div>

        <div
          className="device"
          onClick={handleLinkDevice}
          style={{ cursor: "pointer" }}
        >
          <img src={monitor} alt="" className="icon-device" />
          <p
            className="title-device"
            onClick={handleLinkDevice}
            style={{ cursor: "pointer" }}
          >
            Thiết bị
          </p>
        </div>

        <div
          className="service"
          onClick={handleLinkService}
          style={{ cursor: "pointer" }}
        >
          <img src={service} alt="" className="icon-service" />
          <p className="title-service">Dịch vụ</p>
        </div>

        <div className="number">
          <img src={number} alt="" className="icon-number" />
          <a href="" className="title-number">
            Cấp số
          </a>
        </div>

        <div className="report">
          <img src={report} alt="" className="icon-report" />
          <a href="" className="title-report">
            Báo cáo
          </a>
        </div>
        <div
          className="box-setting-hide-sidebar"
          onMouseEnter={handleSettingMouseEnter}
          onMouseLeave={handleSettingMouseLeave}
        >
          <div className="setting">
            <img src={setting} alt="" className="icon-setting" />
            <a href="" className="title-setting">
              Cài đặt hệ thống
            </a>
            <img src={vertical} alt="" className="icon-setting-2" />
          </div>

          <div className={`box-hide-sidebar ${showArrow ? "show" : ""}`}>
            <div className="row-box-hide-sidebar">
              <p className="text-box-hide-sidebar">Quản lý vai trò</p>
            </div>
            <div className="row-box-hide-sidebar">
              <p className="text-box-hide-sidebar">Quản lý tài khoản</p>
            </div>
            <div className="row-box-hide-sidebar">
              <p className="text-box-hide-sidebar">Nhật ký người dùng</p>
            </div>
          </div>
        </div>

        <div className="logOut">
          <img src={logOut} alt="" className="icon-logOut" />
          <button type="submit" className="btn-logOut">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
