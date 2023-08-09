import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../add/addService.css";
import { Checkbox, message } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  UseAppSelector,
  useAppDispatch,
} from "../../../redux/store/Store";
import { useNavigate, useParams } from "react-router-dom";
import { addService, updateService } from "../../../redux/slice/ServiceSlice";
import { UserType } from "../../../redux/slice/UserSlice";
import { addUserLog } from "../../../redux/slice/UserLogSlice";
import UserLog from "../../userLog/UserLog";
const AddService = () => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const dataSelected = useSelector((state: RootState) =>
    state.services.services.find((item) => item.id === id)
  );

  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};

  const userLog = UseAppSelector((state) =>
    state.userLog.userLog.find((item) => item.id === id)
  );

  const handleCancel = () => {
    navigate("/admin/service");
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    idService: isUpdate ? (dataSelected ? dataSelected.idService : "") : "",
    name: isUpdate ? (dataSelected ? dataSelected.idService : "") : "",
    description: isUpdate ? (dataSelected ? dataSelected.idService : "") : "",
    activeService: "Hoạt động" || "",
  });

  useEffect(() => {
    if (isUpdate && dataSelected) {
      setData({
        ...dataSelected,
      });
    }
  }, [isUpdate, dataSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  console.log({ data });

  const handleAddService = async () => {
    try {
      if (!data.idService || !data.name || !data.description) {
        return message.error("Vui lòng nhập đầy đủ thông tin");
      }
      if (isUpdate) {
        await dispatch(updateService({ ...data, id: id }));
        const updatedUserLog = {
          id: data.idService,
          name: account.userName,
          time: new Date().toISOString(),
          ip: "192.168.3.1",
          action: `Cập nhật dịch vụ ${data.name}`,
        };
        await dispatch(addUserLog(updatedUserLog));
      } else {
        await dispatch(addService(data));
        const newUserLog = {
          name: account.userName,
          time: new Date().toISOString(),
          ip: "192.168.3.1",
          action: `Thêm mới dịch vụ ${data.name}`,
        };
        await dispatch(addUserLog(newUserLog));
      }
      navigate("/admin/service");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="background-detal-service" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Dịch vụ"
          secondTitle="Danh sách dịch vụ"
          thirdTitle={isUpdate ? "Cập nhật dịch vụ" : "Thêm mới dịch vụ"}
          firtsPath="/admin/service"
        />
        <div className="content-detail-service">
          <p className="title-detail-service">Quản lý dịch vụ</p>
          <div className="content-main-detail-service">
            <p className="thongTinService">Thông tin dịch vụ</p>
            <div className="row-detail-service" style={{ display: "flex" }}>
              <div className="col-detail-service-input">
                <div className="box-left-detail-service">
                  <p className="idService-detail">
                    Mã dịch vụ: <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="input-detail-service"
                    name="idService"
                    onChange={handleChange}
                    value={data.idService}
                  />
                </div>
                <div className="box-left-detail-service">
                  <p className="idService-detail">
                    Tên dịch vụ: <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="input-detail-service"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                  />
                </div>
              </div>
              <div
                className="col-detail-service-input"
                style={{ marginRight: "11%" }}
              >
                <p className="idService-detail">
                  Mô tả: <span>*</span>
                </p>
                <input
                  type="text"
                  className="text-description-detail-service"
                  onChange={handleChange}
                  name="description"
                  value={data.description}
                />
              </div>
            </div>

            <div className="row-capSo-add-service">
              <p className="quyTacCapSo">Quy tắc cấp số</p>
              <div className="row-tangTuDong">
                <Checkbox onChange={onChange} className="checkBox-tangTuDong">
                  <span className="tangTuDong-add-service">Tăng tự động</span>
                </Checkbox>
                <div
                  className="row-number-tangtudong-add-service"
                  style={{ display: "flex" }}
                >
                  <input type="number" className="startNumber-add-service" />
                  <p className="text-den">đến</p>
                  <input type="number" className="endNumber-add-service" />
                </div>
              </div>
              <div className="row-tangTuDong mt-1">
                <Checkbox
                  onChange={onChange}
                  className="checkBox-tangTuDong"
                  style={{ marginRight: "15%" }}
                >
                  <span className="tangTuDong-add-service">Prefix:</span>
                </Checkbox>
                <div
                  className="row-number-tangtudong-add-service"
                  style={{ display: "flex" }}
                >
                  <input type="number" className="startNumber-add-service" />
                </div>
              </div>
              <div className="row-tangTuDong mt-1">
                <Checkbox
                  onChange={onChange}
                  className="checkBox-tangTuDong"
                  style={{ marginRight: "15%" }}
                >
                  <span className="tangTuDong-add-service">Surfix:</span>
                </Checkbox>
                <div
                  className="row-number-tangtudong-add-service"
                  style={{ display: "flex" }}
                >
                  <input type="number" className="startNumber-add-service" />
                </div>
              </div>
              <div className="row-tangTuDong ">
                <Checkbox
                  onChange={onChange}
                  className="checkBox-tangTuDong"
                  style={{ marginRight: "-4%" }}
                >
                  <span className="tangTuDong-add-service">Reset mỗi ngày</span>
                </Checkbox>
              </div>
              <p className="thongtinbatbuoc-add-service">
                <span className="text-danger">*</span> Là trường thông tin bắt
                buộc
              </p>
            </div>
          </div>

          <div className="box-button-add-service " style={{ display: "flex" }}>
            <button
              className="btn-cancle-add-service"
              style={{ marginLeft: "17%" }}
              onClick={handleCancel}
            >
              Huỷ
            </button>
            <button
              className="btn-add-add-service"
              style={{ marginLeft: "10%" }}
              onClick={handleAddService}
            >
              {isUpdate ? "Cập nhật " : "Thêm thiết bị"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
