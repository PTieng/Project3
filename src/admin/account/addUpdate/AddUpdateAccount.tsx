import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../addUpdate/addupdateAccount.css";
import { Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UseAppSelector, useAppDispatch } from "../../../redux/store/Store";
import { addUser, updateUser } from "../../../redux/slice/UserSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
const AddUpdateAccount = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;

  const dataSelected = UseAppSelector((state) =>
    state.users.users.find((item) => item.id === id)
  );

  const [confirmPassword, setConFirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: isUpdate ? (dataSelected ? dataSelected.name : "") : "",
    email: isUpdate ? (dataSelected ? dataSelected.email : "") : "",
    phone: isUpdate ? (dataSelected ? dataSelected.phone : "") : "",
    password: isUpdate ? (dataSelected ? dataSelected.password : "") : "",
    userName: isUpdate ? (dataSelected ? dataSelected.userName : "") : "",
    active: isUpdate ? (dataSelected ? dataSelected.active : "") : "",
    vaiTro: isUpdate ? (dataSelected ? dataSelected.vaiTro : "") : "",
  });

  const handleChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSelect = (value: string) => {
    setData((prevValue) => ({
      ...prevValue,
      active: value,
    }));
  };
  const handleVaiTro = (value: string) => {
    setData((prevValue) => ({
      ...prevValue,
      vaiTro: value,
    }));
  };

  useEffect(() => {
    if (isUpdate && dataSelected) {
      setData({
        ...dataSelected,
      });
    }
  }, [isUpdate, dataSelected]);

  const handleClick = async () => {
    try {
      if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.password ||
        !data.userName ||
        !data.active ||
        !data.vaiTro
      ) {
        return message.error("Vui lòng nhập đầy đủ thông tin");
      }
      if (data.password !== confirmPassword) {
        return message.error("Mật khẩu không trùng khớp");
      }
      if (isUpdate) {
        dispatch(updateUser({ ...data, id: id }));
      } else {
        dispatch(addUser(data));
      }
      navigate("/admin/account");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="background-account" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Cài đặt hệ thống"
          secondTitle="Quản lý tài khoản"
          thirdTitle={isUpdate ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
          firtsPath="/admin/account"
        />
        <div className="content-account-update">
          <p className="title-account">Danh sách tài khoản</p>
          <div className="box-content-account">
            <p className="title-box-content-account">Thông tin tài khoản</p>

            <div
              className="row-box-content-account"
              style={{ display: "flex" }}
            >
              <div className="col-row-box-content-account">
                <div className="box-col-row-box-content-account">
                  <p className="title-box-col-row-box-content-account">
                    Họ tên <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="input-box-col-row-box-content-account"
                    name="name"
                    value={data.name}
                    onChange={handleChang}
                  />
                </div>
                <div className="box-col-row-box-content-account mt-2">
                  <p className="title-box-col-row-box-content-account">
                    Số điện thoại <span>*</span>
                  </p>
                  <input
                    type="number"
                    className="input-box-col-row-box-content-account"
                    name="phone"
                    value={data.phone}
                    onChange={handleChang}
                  />
                </div>
                <div className="box-col-row-box-content-account mt-2">
                  <p className="title-box-col-row-box-content-account">
                    Email<span>*</span>
                  </p>
                  <input
                    type="email"
                    className="input-box-col-row-box-content-account"
                    name="email"
                    value={data.email}
                    onChange={handleChang}
                  />
                </div>

                <div className="box-col-row-box-content-account mt-2">
                  <p className="title-box-col-row-box-content-account">
                    Vai trò <span>*</span>
                  </p>
                  <Select
                    defaultValue="Chọn vai trò"
                    onChange={handleVaiTro}
                    className="select-box-col-row-box-content-account"
                    options={[
                      { value: "Kế toán", label: "Kế toán" },
                      { value: "Quản lý", label: "Quản lý" },
                      { value: "Admin", label: "Admin" },
                    ]}
                    value={data.vaiTro}
                  />
                </div>
              </div>
              <div
                className="col-row-box-content-account"
                style={{ marginLeft: "10%" }}
              >
                <div className="box-col-row-box-content-account">
                  <p className="title-box-col-row-box-content-account">
                    Tên đăng nhập <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="input-box-col-row-box-content-account"
                    name="userName"
                    value={data.userName}
                    onChange={handleChang}
                  />
                </div>
                <div className="box-col-row-box-content-account mt-2">
                  <p className="title-box-col-row-box-content-account">
                    Mật khẩu <span>*</span>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-box-col-row-box-content-account"
                    name="password"
                    value={data.password}
                    onChange={handleChang}
                  />
                  <button
                    className="hide-password-account"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
                </div>
                <div className="box-col-row-box-content-account mt-2">
                  <p className="title-box-col-row-box-content-account">
                    Nhập lại mật khẩu<span>*</span>
                  </p>
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className="input-box-col-row-box-content-account"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConFirmPassword(e.target.value)}
                  />
                  <button
                    className="hide-password-account"
                    onClick={toggleShowPassword2}
                  >
                    {showPassword2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
                </div>

                <div className="box-col-row-box-content-account mt-2">
                  <p className="title-box-col-row-box-content-account">
                    Tình trạng <span>*</span>
                  </p>
                  <Select
                    defaultValue="Chọn tình trạng "
                    onChange={handleSelect}
                    className="select-box-col-row-box-content-account"
                    value={data.active}
                    options={[
                      { value: "Hoạt động", label: "Hoạt động" },
                      { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="box-button-acount"
            style={{
              display: "flex",
            }}
          >
            <button className="btn-cancel-accont">Huỷ bỏ</button>
            <button
              className="btn-update-account"
              style={{ marginLeft: "10%" }}
              onClick={handleClick}
            >
              {isUpdate ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateAccount;
