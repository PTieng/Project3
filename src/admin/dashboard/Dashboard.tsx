import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import "../dashboard/dashboard.css";
import avarta from "../../images/avarta.avif";
import notification from "../../images/notification.png";
import soDaCap from "../../images/soDaCap.png";
import { Progress, Tag } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import soDaDung from "../../images/soDaDung.png";
import soDangCho from "../../images/soDaDung.png";
import soBoQua from "../../images/daBoQua.png";
import cYellow from "../../images/c-yellow.png";
import cGrey from "../../images/c-grey.png";
import deviceImg from "../../images/device.png";
import serviceImg from "../../images/service.png";
import cBlue from "../../images/c-blue.png";
import capSoImg from "../../images/capSO.png";
import cRed from "../../images/c-red.png";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../redux/slice/UserSlice";
import { UseAppSelector, useAppDispatch } from "../../redux/store/Store";
import datePicker from "../../images/datePicker.png";
import format from "date-fns/format";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleInfor = () => {
    navigate("/admin/information");
  };

  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};

  const dispatch = useAppDispatch();
  const device = UseAppSelector((state) => state.devices.devices);

  const totalDevice = device.length;
  const activeDeviceCount = device.filter(
    (device) => device.active === "Hoạt động"
  ).length;
  const inactiveDeviceCount = device.filter(
    (device) => device.active === "Ngưng hoạt động"
  ).length;

  const service = UseAppSelector((state) => state.services.services);
  const totalService = service.length;
  const activeServiceCount = service.filter(
    (service) => service.activeService === "Hoạt động"
  ).length;
  const inactiveServiceCount = service.filter(
    (service) => service.activeService === "Ngưng hoạt động"
  ).length;

  const capSo = UseAppSelector((state) => state.capSo.capSo);

  const totalCapSo = capSo.length;
  const activeCapSoCount = capSo.filter(
    (capSo) => capSo.active === "Đã sử dụng"
  ).length;
  const inactiveCapSoCount = capSo.filter(
    (capSo) => capSo.active === "Đang chờ"
  ).length;
  const passCapSoCount = capSo.filter(
    (capSo) => capSo.active === "Bỏ qua"
  ).length;

  const countCapSoSTT = capSo.filter((capSo) => capSo.stt).length;
  const [showHide, setShowHide] = useState(false);
  const handleShow = () => {
    setShowHide(!showHide);
  };
  return (
    <div>
      <div className="background-dashboard">
        <SideBar />
        <div className="content">
          <div className="col-mid-dashboard">
            <div className="header">
              <p className="name-page">Dashboard</p>
            </div>

            <div className="main-content-dashboard">
              <div className="row-title-main-content-dashboard">
                <p className="bieuDoCapSo">Biểu đồ cấp số</p>
              </div>
              <div className="row-solieu">
                <div className="col-soDaCap">
                  <div className="header">
                    <img src={soDaCap} alt="" className="img-soDaCap" />
                    <p className="title">
                      Số thứ tự <br /> đã cấp
                    </p>
                  </div>
                  <p className="number-soDaCap">{countCapSoSTT}</p>

                  <p className="tag">
                    <Tag bordered={false} color="orange">
                      <ArrowUpOutlined
                        className="icon-up"
                        style={{ fontSize: "20px" }}
                      />
                      32.41 %
                    </Tag>
                  </p>
                </div>
                <div className="col-soDaDung">
                  <div className="header">
                    <img src={soDaDung} alt="" className="img-soDaDung" />
                    <p className="title">
                      Số thứ tự <br /> đã sử dụng
                    </p>
                  </div>
                  <p className="number-soDaDung">{activeCapSoCount}</p>

                  <p className="tag">
                    <Tag bordered={false} color="red">
                      <ArrowUpOutlined
                        className="icon-up"
                        style={{ fontSize: "20px" }}
                      />
                      32.41 %
                    </Tag>
                  </p>
                </div>
                <div className="col-soDangCho">
                  <div className="header">
                    <img src={soDangCho} alt="" className="img-soDangCho" />
                    <p className="title">
                      Số thứ tự <br /> đang chờ
                    </p>
                  </div>
                  <p className="number-soDangCho">{inactiveCapSoCount}</p>

                  <p className="tag">
                    <Tag bordered={false} color="orange">
                      <ArrowUpOutlined
                        className="icon-up"
                        style={{ fontSize: "20px" }}
                      />
                      32.41 %
                    </Tag>
                  </p>
                </div>
                <div className="col-soBoQua">
                  <div className="header">
                    <img src={soBoQua} alt="" className="img-soBoQua" />
                    <p className="title">
                      Số thứ tự <br /> đã bỏ qua
                    </p>
                  </div>
                  <p className="number-soBoQua">{passCapSoCount}</p>

                  <p className="tag">
                    <Tag bordered={false} color="red">
                      <ArrowUpOutlined
                        className="icon-up"
                        style={{ fontSize: "20px" }}
                      />
                      32.41 %
                    </Tag>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-right-dashboard">
            <div className="box-user-dashboard">
              <div className="row-header-user-dashboard">
                <div className="circle-noticatio-dashboard">
                  <img
                    src={notification}
                    alt=""
                    className="img-notification-dashboard"
                    style={{ cursor: "pointer" }}
                    onClick={handleShow}
                  />
                  {showHide && (
                    <div className="nofitication-hide-dashboard">
                      <div className="header-nofitication-hide">
                        <p className="thongbao">Thông báo</p>
                      </div>

                      <div className="row-nofitication-hide">
                        {capSo.map((item, index) => (
                          <div
                            key={index}
                            className="row-data-capSo-nofitication-hide "
                            style={{ marginTop: "20px" }}
                          >
                            <p className="name-data-capSo-noti">
                              Người dùng:{" "}
                              <span style={{ marginLeft: "5%" }}>
                                {item.cusName}
                              </span>
                            </p>
                            <p className="time-data-capSo-noti">
                              Thời gian nhận số:{" "}
                              <span style={{ marginLeft: "1%" }}>
                                {format(
                                  new Date(item.dateCap),
                                  "HH:mm - dd/MM/yyyy"
                                )}
                              </span>
                            </p>
                            <hr className="hr-noti" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="box-user-dashboard-header">
                  <img
                    src={avarta}
                    alt=""
                    className="imgAvarta-dashboard"
                    onClick={handleInfor}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="hello-dashboard">Xin chào</p>
                  <p
                    className="userName-dashboard"
                    onClick={handleInfor}
                    style={{ cursor: "pointer" }}
                  >
                    {account.name}
                  </p>
                </div>
              </div>

              <div className="row-content-user-dashboard">
                <p className="title">Tổng quan</p>
                <div className="row-device">
                  <div className="col-number-device-dashboard">
                    <p className="number-device-dashboard">{totalDevice}</p>
                    <div className="row-img-device-dashboard">
                      <div>
                        <Progress
                          type="circle"
                          percent={50}
                          className="circle-device-hoatDong"
                          style={{ height: "80px", width: "80px" }}
                          strokeColor="#FF7506"
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small"
                          strokeColor="#7E7D88"
                          percent={25}
                        />
                      </div>

                      <div
                        className="name-number-device-dashboard"
                        style={{ display: "flex" }}
                      >
                        <img
                          src={deviceImg}
                          alt=""
                          className="img-device-dashboard"
                        />
                        <p className="name-device-dashboard">Thiết bị</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-soLieu">
                    <div className="row-dangHoatDong">
                      <img src={cYellow} alt="" className="c-yellow" />
                      <p className="title">Đang hoạt động</p>
                      <p className="number-dangHoatDong">{activeDeviceCount}</p>
                    </div>
                    <div className="row-ngungHoatDong">
                      <img src={cGrey} alt="" className="c-grey" />
                      <p className="title">Ngưng hoạt động</p>
                      <p className="number-ngungHoatDong">
                        {inactiveDeviceCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row-service">
                  <div className="col-number-service-dashboard">
                    <p className="number-service-dashboard">{totalService}</p>
                    <div className="row-img-service-dashboard">
                      <div>
                        <Progress
                          type="circle"
                          percent={50}
                          className="circle-device-hoatDong"
                          style={{ height: "80px", width: "80px" }}
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small"
                          strokeColor="#7E7D88"
                          percent={25}
                        />
                      </div>
                      <div
                        className="name-number-device-dashboard"
                        style={{ display: "flex" }}
                      >
                        <img
                          src={serviceImg}
                          alt=""
                          className="img-device-dashboard"
                        />
                        <p className="name-service-dashboard">Dịch vụ</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-soLieu-service">
                    <div className="row-dangHoatDong-service">
                      <img src={cBlue} alt="" className="c-blue" />
                      <p className="title">Đang hoạt động</p>
                      <p
                        className="number-dangHoatDong-service"
                        style={{ color: "#4277FF" }}
                      >
                        {activeServiceCount}
                      </p>
                    </div>
                    <div className="row-ngungHoatDong-service">
                      <img src={cGrey} alt="" className="c-grey-service" />
                      <p className="title">Ngưng hoạt động</p>
                      <p
                        className="number-ngungHoatDong-service"
                        style={{ color: "#4277FF" }}
                      >
                        {inactiveServiceCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row-number">
                  <div className="col-number-service-dashboard">
                    <p className="number-service-dashboard">{totalCapSo}</p>
                    <div className="row-img-service-dashboard">
                      <div>
                        <Progress
                          type="circle"
                          percent={50}
                          className="circle-device-hoatDong"
                          style={{ height: "80px", width: "80px" }}
                          strokeColor="#35C75A"
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small2"
                          strokeColor="#7E7D88"
                          percent={25}
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small3"
                          percent={10}
                          strokeColor="#F178B6"
                        />
                      </div>
                      <div
                        className="name-number-device-dashboard"
                        style={{ display: "flex", marginLeft: "6%" }}
                      >
                        <img
                          src={capSoImg}
                          alt=""
                          className="img-device-dashboard"
                        />
                        <p
                          className="name-service-dashboard"
                          style={{ color: "#35C75A" }}
                        >
                          Cấp số
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-soLieu-service">
                    <div className="row-dangHoatDong-service">
                      <img src={cBlue} alt="" className="c-blue" />
                      <p className="title">Đang hoạt động</p>
                      <p
                        className="number-dangHoatDong-service"
                        style={{ color: "#35C75A" }}
                      >
                        {activeCapSoCount}
                      </p>
                    </div>
                    <div className="row-dangCho-capSo">
                      <img
                        src={cGrey}
                        alt=""
                        className="c-blue"
                        style={{ top: "53px" }}
                      />
                      <p className="title">Đang chờ</p>
                      <p
                        className="number-dangCho-capSo"
                        style={{ color: "#35C75A", left: "58px" }}
                      >
                        {inactiveCapSoCount}
                      </p>
                    </div>
                    <div className="row-ngungHoatDong-capSo">
                      <img
                        src={cRed}
                        alt=""
                        className="c-grey-service"
                        style={{ top: "10px" }}
                      />
                      <p className="title" style={{ left: "-28%" }}>
                        Bỏ qua
                      </p>
                      <p
                        className="number-ngungHoatDong-capSo"
                        style={{ color: "#35C75A", top: "-35px" }}
                      >
                        {passCapSoCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row-calendar">
                  <img
                    src={datePicker}
                    alt=""
                    style={{ width: "110%", height: "113%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
