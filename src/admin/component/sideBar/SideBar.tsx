import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const SideBar = () => {
  const navigate = useNavigate();
  const [showArrow, setShowArrow] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleSettingMouseEnter = () => {
    setShowArrow(true);
  };

  const handleSettingMouseLeave = () => {
    setShowArrow(false);
  };

  const handleLinkClick = (itemName: string, path: string) => {
    navigate(path);
    setActiveItem(itemName);
  };

  const isActive = (itemName: string) => {
    return activeItem === itemName ? "active" : "";
  };

  return (
    <div>
      <div className="sideBar">
        <img src={logoAlta} alt="" className="logo" />

        <NavLink
          to="/admin/dashboard"
          className={`dashboard ${isActive("dashboard")}`}
          onClick={() => handleLinkClick("dashboard", "/admin/dashboard")}
          style={{ textDecoration: "none" }}
        >
          <img src={dashboard} alt="" className="icon-dashboard" />
          <p className="title-dashboard">Dashboard</p>
        </NavLink>

        <NavLink
          to="/admin/device"
          className={`device ${isActive("device")}`}
          onClick={() => handleLinkClick("device", "/admin/device")}
          style={{ textDecoration: "none" }}
        >
          <div className="hover-sidebar-change-color">
            <img src={monitor} alt="" className="icon-device" />
            <p className="title-device">Thiết bị</p>{" "}
          </div>
        </NavLink>

        <NavLink
          to="/admin/service"
          className={`service ${isActive("service")}`}
          onClick={() => handleLinkClick("service", "/admin/service")}
          style={{ textDecoration: "none" }}
        >
          <img src={service} alt="" className="icon-service" />
          <p className="title-service">Dịch vụ</p>
        </NavLink>

        <NavLink
          to="/admin/capso" // Đường dẫn cho phần "Cấp số"
          className={`number ${isActive("capso")}`} // Chỉnh className tương ứng
          onClick={() => handleLinkClick("capso", "/admin/capso")} // Xử lý sự kiện khi click
          style={{ textDecoration: "none" }}
        >
          <img src={number} alt="" className="icon-number" />
          <p className="title-number">Cấp số</p>
        </NavLink>

        <NavLink
          to="/admin/baocao"
          className={`report ${isActive("baocao")}`}
          onClick={() => handleLinkClick("baocao", "/admin/baocao")}
          style={{ textDecoration: "none" }}
        >
          <img src={report} alt="" className="icon-report" />
          <p className="title-report">Báo cáo</p>
        </NavLink>
        <div
          className={`box-setting-hide-sidebar ${showArrow ? "show" : ""}`}
          onMouseEnter={handleSettingMouseEnter}
          onMouseLeave={handleSettingMouseLeave}
        >
          <div className={`setting ${showArrow ? "active" : ""}`}>
            <img src={setting} alt="" className="icon-setting" />
            <a href="" className="title-setting">
              Cài đặt hệ thống
            </a>
            <img
              src={vertical}
              alt=""
              className={`icon-setting-2 ${showArrow ? "active" : ""}`}
            />
          </div>

          <div className={`box-hide-sidebar ${showArrow ? "show" : ""}`}>
            <NavLink
              to="/admin/vaitro"
              className={`row-box-hide-sidebar ${isActive("role-management")}`}
              style={{ textDecoration: "none" }}
            >
              <p
                className={`text-box-hide-sidebar ${isActive(
                  "role-management"
                )}`}
              >
                Quản lý vai trò
              </p>
            </NavLink>
            <NavLink
              to="/admin/account"
              className={`row-box-hide-sidebar2 ${isActive(
                "account-management"
              )}`}
              style={{ textDecoration: "none" }}
            >
              <p
                className={`text-box-hide-sidebar2 ${isActive(
                  "account-management"
                )}`}
              >
                Quản lý tài khoản
              </p>
            </NavLink>
            <NavLink
              to="/admin/user"
              className={`row-box-hide-sidebar3 ${isActive("user-log")}`}
              style={{ textDecoration: "none" }}
            >
              <p className={`text-box-hide-sidebar3 ${isActive("user-log")}`}>
                Nhật ký người dùng
              </p>
            </NavLink>
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
