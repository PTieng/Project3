import React from "react";
import "../admin/sideBar.css";
import logoAlta from "../images/Logo alta.png";
import dashboard from "../images/dashboard.png";
import monitor from "../images/monitor.png";
import service from "../images/service.png";
import number from "../images/number.png";
import report from "../images/report.png";
import setting from "../images/setting.png";
import vertical from "../images/fi_more-vertical.png"
import logOut from "../images/logOut.png";

const SideBar = () => {
  return (
    <div>
      <div className="background-info">
        <div className="box-left">
          <img src={logoAlta} alt="" className="logo" />

          <div className="dashboard">
            <img src={dashboard} alt="" className="icon-dashboard" />
            <a href="" className="title-dashboard">
              Dashboard
            </a>
          </div>

          <div className="device">
            <img src={monitor} alt="" className="icon-device" />
            <a href="" className="title-device">
              Thiết bị
            </a>
          </div>

          <div className="service">
            <img src={service} alt="" className="icon-service" />
            <a href="" className="title-service">
              Dịch vụ
            </a>
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

          <div className="setting">
            <img src={setting} alt="" className="icon-setting" />
            <a href="" className="title-setting">
              Cài đặt hệ thống
            </a>
            <img src={vertical} alt="" className="icon-setting-2"/>
          </div>

          <div className="logOut">
            <img src={logOut} alt="" className="icon-logOut" />
            <button type="submit" className="btn-logOut">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
