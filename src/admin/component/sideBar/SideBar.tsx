import React, { useMemo, useState } from "react";
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
import { Button, Popover } from "antd";

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

  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  const buttonWidth = 70;
  const content = (
    <div>
      <p style={{ cursor: "pointer" }}>Quản lý vai trò</p>
      <p style={{ cursor: "pointer" }}>Quản lý tài khoản</p>
      <p style={{ cursor: "pointer" }}>Nhật ký người dùng</p>
    </div>
  );
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

        <div className="service" onClick={handleLinkService}>
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

          <img src={vertical} alt="" className="icon-setting-2" />
        </div>
        <div
          style={{
            marginLeft: buttonWidth,
            clear: "both",
            whiteSpace: "nowrap",
          }}
        >
          <Popover placement="bottomLeft" content={content} arrow={mergedArrow}>
            <a href="" className="title-setting">
              Cài đặt hệ thống
            </a>
          </Popover>
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
