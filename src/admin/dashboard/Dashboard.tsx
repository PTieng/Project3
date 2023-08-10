import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import "../dashboard/dashboard.css";
import avarta from "../../images/avarta.avif";
import notification from "../../images/notification.png";
import soDaCap from "../../images/soDaCap.png";
import { Progress, Select, Tag } from "antd";
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
import { fetchDataCapSo } from "../../redux/slice/CapSoSlice";
import { Area } from "@ant-design/plots";
import { da } from "date-fns/locale";
import { current } from "@reduxjs/toolkit";

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

  const percentHoatDongDevice = (
    (activeDeviceCount / totalDevice) *
    100
  ).toFixed(1);
  const percentNgungHoatDongDevice = (
    (inactiveDeviceCount / totalDevice) *
    100
  ).toFixed(1);

  const service = UseAppSelector((state) => state.services.services);
  const totalService = service.length;
  const activeServiceCount = service.filter(
    (service) => service.activeService === "Hoạt động"
  ).length;
  const inactiveServiceCount = service.filter(
    (service) => service.activeService === "Ngưng hoạt động"
  ).length;

  const percentHoatDongService = (
    (activeServiceCount / totalService) *
    100
  ).toFixed(1);
  const percentNgungHoatDongService = (
    (inactiveServiceCount / totalService) *
    100
  ).toFixed(1);

  const capSo = UseAppSelector((state) => state.capSo.capSo);
  const countCapSoSTT = capSo.filter((capSo) => capSo.stt).length;

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

  const percentHoatDongCapSo = ((activeCapSoCount / totalCapSo) * 100).toFixed(
    1
  );
  const percentNgungHoatDongCapSp = (
    (inactiveCapSoCount / totalCapSo) *
    100
  ).toFixed(1);

  const percentPassCapSo = ((passCapSoCount / totalCapSo) * 100).toFixed(1);

  const [showHide, setShowHide] = useState(false);
  const handleShow = () => {
    setShowHide(!showHide);
  };

  const [selectOption, setSelectOption] = useState<string>("Ngày");
  const handleChange = (value: string) => {
    setSelectOption(value);
  };

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   dispatch(fetchDataCapSo());
  // }, [dispatch]);

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
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
              <div className="charAt-dashboard">
                <div
                  className="row-charAt-dashboard"
                  style={{ display: "flex" }}
                >
                  <div className="col-row-charAt-dashboard">
                    <p className="title-chart-dashboard">
                      Bảng thống kê theo ngày
                    </p>
                    <p className="month-chart-dashboard">Tháng 11/2023</p>
                  </div>
                  <div
                    className="col-row-charAt-dashboard2"
                    style={{ display: "flex" }}
                  >
                    <p className="title-col-row-charAt-dashboard2">Xem theo</p>
                    <Select
                      defaultValue="Ngày"
                      style={{ width: 120 }}
                      className="select-DWM"
                      onChange={handleChange}
                      options={[
                        { value: "Ngày", label: "Ngày" },
                        { value: "Tuần", label: "Tuần" },
                        { value: "Tháng", label: "Tháng" },
                      ]}
                    />
                  </div>
                </div>
                {/* <canvas id="myChart" className="charAt"></canvas> */}
                <Area {...config} className="charAt"/>
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
                          percent={parseFloat(percentHoatDongDevice)}
                          className="circle-device-hoatDong"
                          style={{ height: "80px", width: "80px" }}
                          strokeColor="#FF7506"
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small"
                          strokeColor="#7E7D88"
                          percent={parseFloat(percentNgungHoatDongDevice)}
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
                          percent={parseFloat(percentHoatDongService)}
                          className="circle-device-hoatDong"
                          style={{ height: "80px", width: "80px" }}
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small"
                          strokeColor="#7E7D88"
                          percent={parseFloat(percentNgungHoatDongService)}
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
                          percent={parseFloat(percentHoatDongCapSo)}
                          className="circle-device-hoatDong"
                          style={{ height: "80px", width: "80px" }}
                          strokeColor="#35C75A"
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small2"
                          strokeColor="#7E7D88"
                          percent={parseFloat(percentNgungHoatDongCapSp)}
                        />
                        <Progress
                          type="circle"
                          className="circle-device-hoatDong-small3"
                          percent={parseFloat(percentPassCapSo)}
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

                {/* <div className="row-calendar"></div> */}
                <img src={datePicker} alt="" className="img-datePicker" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
