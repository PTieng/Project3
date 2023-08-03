import React, { useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../addDevice/newDevice.css";
import { Select, Space, Tag } from "antd";
import { useAppDispatch } from "../../../redux/store/Store";
import { addDevice } from "../../../redux/slice/DeviceSlice";
import { useNavigate } from "react-router-dom";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const NewDevice = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    
    idTB: "",
    name: "",
    ip: "",
    active: "Hoạt động",
    type: "",
    userName: "",
    password: "",
    connect: "Mất kết nối",
    usedService: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setData((prevalue) => ({
      ...prevalue,
      type: value,
    }));
  };

  const handleSelectChangeService = (value: string[]) => {
    setData((prevalue) => ({
      ...prevalue,
      usedService: value,
    }));
  };

  const options = [
    { value: "Khám tim mạch" },
    { value: "Khám sản phụ khoa" },
    { value: "Khám răng hàm mặt" },
    { value: "Khám tai mũi họng" },
    { value: "Khám hô hấp" },
    { value: "Khám tổng quát" },
  ];

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const handleClick = async () => {
    try {
      if (
        !data.idTB ||
        !data.name ||
        !data.type ||
        !data.usedService ||
        !data.userName ||
        !data.password ||
        !data.ip
      ) {
        return alert("error");
      }
      await dispatch(addDevice(data));
      navigate("/admin/device");
      console.log(data);
    } catch (err) {}
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="background-newDevice">
        <SideBar />
        <Header
          firstTitle="Thết bị"
          secondTitle="Danh sách thiết bị"
          firtsPath="/admin/device"
          thirdTitle="Thêm mới thiết bị"
          secondPath="/admin/device/add"
        />
      </div>
      <div className="content-newDevice">
        <p className="title-newDevice">Quản lý thiết bị</p>
        <div className="box-input-newDevice">
          <p className="box-input-newDevice-title">Thông tin thiết bị</p>
          <div className="row-newDevice">
            <div className="col-left-newDevice">
              <div className="form-input-id-newDevice">
                <p className="label-id-newDevice">
                  Mã thiết bị: <span className="dauSao">*</span>{" "}
                </p>
                <input
                  type="text"
                  className="input-newDevice-id"
                  placeholder="Nhập mã thiết bị"
                  name="idTB"
                  onChange={handleChange}
                  value={data.idTB}
                />
              </div>
              <div
                className="form-input-id-newDevice"
                style={{ marginTop: "100px" }}
              >
                <p className="label-id-newDevice">
                  Tên thiết bị: <span className="dauSao">*</span>{" "}
                </p>
                <input
                  type="text"
                  className="input-newDevice-id"
                  placeholder="Nhập tên thiết bị"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>

              <div
                className="form-input-id-newDevice"
                style={{ marginTop: "200px" }}
              >
                <p className="label-id-newDevice">
                  Địa chỉ IP: <span className="dauSao">*</span>{" "}
                </p>
                <input
                  type="text"
                  className="input-newDevice-id"
                  placeholder="Nhập địa chỉ IP"
                  name="ip"
                  onChange={handleChange}
                  value={data.ip}
                />
              </div>
            </div>
            <div className="col-left-newDevice">
              <div className="form-input-id-newDevice">
                <p className="label-id-newDevice">
                  Loại thiết bị: <span className="dauSao">*</span>{" "}
                </p>
                <Space wrap>
                  <Select
                    className="select-hoatDong-newDevice"
                    defaultValue="Tất cả"
                    style={{
                      width: 510,
                      height: 41,
                      top: 30,
                      padding: "5px 11px",
                    }}
                    options={[
                      { value: "tất cả", label: "Tất cả" },
                      { value: "kiosk", label: "Kiosk" },
                      { value: "Display connect", label: "Display connect" },
                    ]}
                    onChange={handleSelectChange}
                    value={data.type}
                  />
                </Space>
              </div>
              <div
                className="form-input-id-newDevice"
                style={{ marginTop: "100px" }}
              >
                <p className="label-id-newDevice">
                  Tên đăng nhập: <span className="dauSao">*</span>{" "}
                </p>
                <input
                  type="text"
                  className="input-newDevice-id"
                  placeholder="Nhập tài khoản"
                  name="userName"
                  onChange={handleChange}
                  value={data.userName}
                />
              </div>

              <div
                className="form-input-id-newDevice"
                style={{ marginTop: "200px" }}
              >
                <p className="label-id-newDevice">
                  Mật khẩu: <span className="dauSao">*</span>{" "}
                </p>
                <input
                  type="text"
                  className="input-newDevice-id"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                />
              </div>
            </div>
            <div className="from-input-service-newDevice">
              <p className="label-service-newDevice">
                Dịch vụ sử dụng:<span className="dauSao">*</span>{" "}
              </p>
              <Select
                mode="multiple"
                tagRender={tagRender}
                style={{ width: "100%", color: "black" }}
                options={options}
                onChange={handleSelectChangeService}
                value={data.usedService}
              />
              <p className="label-luuY-newDevice">
                <span className="dauSaoLuY me-2">*</span> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>
          <div className="form-button-newDevice">
            <button className="btn-cancel-newDevice">Huỷ bỏ</button>
            <button className="btn-create-newDevice" onClick={handleClick}>
              Thêm thiết bị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDevice;
