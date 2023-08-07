import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../addDevice/newDevice.css";
import { Select, Space} from "antd";
import { RootState, useAppDispatch } from "../../../redux/store/Store";
import { message } from "antd";

import { addDevice, updateDevice } from "../../../redux/slice/DeviceSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Option } from "antd/es/mentions";

const NewDevice = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const dataSelected = useSelector((state: RootState) =>
    state.devices.devices.find((item) => item.id === id)
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    idTB: isUpdate ? (dataSelected ? dataSelected.idTB : "") : "",
    name: isUpdate ? dataSelected?.name || "" : "",
    ip: isUpdate ? dataSelected?.ip || "" : "",
    active: "Hoạt động",
    type: isUpdate ? dataSelected?.type || "" : "",
    userName: isUpdate ? dataSelected?.userName || "" : "",
    password: isUpdate ? dataSelected?.password || "" : "",
    connect: "Mất kết nối",
    usedService: isUpdate ? dataSelected?.usedService || [] : [],
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

  const services = useSelector((state: RootState) => state.services.services);

  console.log(services);

  const handleCancel = () => {
    navigate("/admin/device");
  };
  useEffect(() => {
    if (isUpdate && dataSelected) {
      setData({
        ...dataSelected,
        usedService: dataSelected.usedService || [],
      });
    }
  }, [isUpdate, dataSelected]);

  console.log(data);

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
        return message.error("Vui lòng nhập đầy đủ thông tin");
      }

      if (isUpdate) {
        await dispatch(updateDevice({ ...data, id: id }));
      } else {
        await dispatch(addDevice(data));
      }
      navigate("/admin/device");
      console.log(data);
    } catch (err) {}
  };
  console.log("data.idTB:", data.idTB);
  console.log("dataSelected?.idTB:", dataSelected?.idTB);

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="background-newDevice">
        <SideBar />
        <Header
          firstTitle="Thiết bị"
          secondTitle="Danh sách thiết bị"
          firtsPath="/admin/device"
          thirdTitle={isUpdate ? "Cập nhật thiết bị" : "Thêm mới thiết bị"}
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
            <div
              className="from-input-service-newDevice"
              style={{ marginTop: "15px" }}
            >
              <p
                className="label-service-newDevice"
                style={{ marginTop: "-15px" }}
              >
                Dịch vụ sử dụng:<span className="dauSao">*</span>
              </p>
              <Select
                mode="multiple"
                className="select-hoatDong-newDevice"
                style={{ width: "100%", color: "black", marginTop: "25px" }}
                onChange={handleSelectChangeService}
                value={data.usedService}
              >
                {services.map((service) => (
                  <Option key={service.name} value={service.name}>
                    {service.name}
                  </Option>
                ))}
              </Select>
              <p className="label-luuY-newDevice">
                <span className="dauSaoLuY me-2">*</span> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>
          <div className="form-button-newDevice">
            <button className="btn-cancel-newDevice" onClick={handleCancel}>
              Huỷ bỏ
            </button>
            <button className="btn-create-newDevice" onClick={handleClick}>
              {isUpdate ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDevice;
