import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../update/updateVaiTro.css";
import { Checkbox, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { UseAppSelector, useAppDispatch } from "../../../redux/store/Store";
import {
  addVaiTro,
  fetchDataVaiTro,
  updateVaiTro,
} from "../../../redux/slice/VaiTroSlice";
import { UserType } from "../../../redux/slice/UserSlice";
import { addUserLog } from "../../../redux/slice/UserLogSlice";

const UpdateVaiTro = () => {
  const { id } = useParams<string>();
  const isUpdate = !!id;
  const navigate = useNavigate();
  const vaiTro = UseAppSelector((state) =>
    state.vaiTro.vaiTro.find((item) => item.id === id)
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDataVaiTro());
  }, [dispatch]);

  const [data, setData] = useState({
    name: isUpdate ? (vaiTro ? vaiTro.name : "") : "",
    desc: isUpdate ? (vaiTro ? vaiTro.desc : "") : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const userLog = UseAppSelector((state) => state.userLog.userLog);
  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};
  const handleCancel = () => {
    navigate("/admin/vaitro");
  };
  const handleSubmit = async () => {
    try {
      if (!data.name || !data.desc) {
        return message.error("Vui lòng nhập đầy đủ thông tin");
      }

      if (isUpdate) {
        await dispatch(updateVaiTro({ ...data, id: id }));
        message.success("Cập nhật thành công");
        const newUserLog = {
          name: account.userName,
          time: new Date().toISOString(),
          ip: "192.168.3.1",
          action: `Cập nhật vai trò ${data.name}`,
        };
        await dispatch(addUserLog(newUserLog));
      } else {
        await dispatch(addVaiTro(data));
        message.success("Thêm thành công");
        const newUserLog = {
          name: account.userName,
          time: new Date().toISOString(),
          ip: "192.168.3.1",
          action: `Thêm mới vai trò ${data.name}`,
        };
        await dispatch(addUserLog(newUserLog));
      }
      navigate("/admin/vaitro");
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      <div className="background-update-vaitro" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Cài đặt hệ thống"
          secondTitle="Quản lý vai trò"
          thirdTitle={isUpdate ? "Cập nhật vai trò" : "Thêm vai trò"}
          firtsPath="/admin/vaitro"
        />
        <div className="content-update-vaitro">
          <p className="title-update-vaitro">Danh sách vai trò</p>
          <div className="content-main-update-vaitro">
            <p className="title-content-main-update-vaitro">
              Thông tin vai trò
            </p>
            <div
              className="row-content-main-update-vaitro"
              style={{ display: "flex" }}
            >
              <div className="col">
                <div className="col-form-input-update-vaitro">
                  <p className="title-col-form-input-update-vaitro">
                    Tên vai trò <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="input-col-form-input-update-vaitro"
                    placeholder="Nhập tên vai trò"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                  />
                </div>
                <div className="col-form-input-update-vaitro mt-4">
                  <p className="title-col-form-input-update-vaitro">
                    Mô tả <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="input-col-form-input-update-vaitro2"
                    placeholder="Nhập tên vai trò"
                    name="desc"
                    onChange={handleChange}
                    value={data.desc}
                  />
                </div>
              </div>
              <div className="col">
                <div className="col-from-checkbox-udpate-vaitro">
                  <div className="box-title-col-from-checkbox-udpate-vaitro">
                    <p className="title-box-title-col-from-checkbox-udpate-vaitro">
                      Nhóm chức năng A
                    </p>
                  </div>
                  <div className="row-checkbox">
                    <Checkbox onChange={onChange}>Tất cả</Checkbox>
                  </div>
                  <div
                    className="row-checkbox mt-2"
                    style={{ marginLeft: "7%" }}
                  >
                    <Checkbox onChange={onChange}>Chức năng x</Checkbox>
                  </div>
                  <div
                    className="row-checkbox mt-2"
                    style={{ marginLeft: "7%" }}
                  >
                    <Checkbox onChange={onChange}>Chức năng y</Checkbox>
                  </div>
                  <div
                    className="row-checkbox mt-2"
                    style={{ marginLeft: "7%" }}
                  >
                    <Checkbox onChange={onChange}>Chức năng z</Checkbox>
                  </div>
                  <div className="box-title-col-from-checkbox-udpate-vaitro mt-3">
                    <p className="title-box-title-col-from-checkbox-udpate-vaitro">
                      Nhóm chức năng B
                    </p>
                  </div>
                  <div className="row-checkbox">
                    <Checkbox onChange={onChange}>Tất cả</Checkbox>
                  </div>
                  <div
                    className="row-checkbox mt-2"
                    style={{ marginLeft: "7%" }}
                  >
                    <Checkbox onChange={onChange}>Chức năng x</Checkbox>
                  </div>
                  <div
                    className="row-checkbox mt-2"
                    style={{ marginLeft: "7%" }}
                  >
                    <Checkbox onChange={onChange}>Chức năng y</Checkbox>
                  </div>
                  <div
                    className="row-checkbox mt-2"
                    style={{ marginLeft: "7%" }}
                  >
                    <Checkbox onChange={onChange}>Chức năng z</Checkbox>
                  </div>
                </div>
                <div
                  className="row-button-update-vaitro"
                  style={{ display: "flex" }}
                >
                  <button className="btn-cancle-vaitro" onClick={handleCancel}>
                    Huỷ
                  </button>
                  <button className="btn-add-vaitro" onClick={handleSubmit}>
                    {isUpdate ? "Cập nhật" : "Thêm mới"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVaiTro;
