import React from "react";
import SideBar from "../component/sideBar/SideBar";
import "../informaton/information.css";
import avarta from "../../images/avarta.avif";
import circle from "../../images/circle-avarta.png";
import notification from "../../images/notification.png";

import camera from "../../images/camera.png";
import { UserType } from "../../redux/slice/UserSlice";
const Information = () => {
  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};
  return (
    <div>
      <div className="background-information">
        <SideBar />
        <div className="content">
          <div className="header-information">
            <p className="title-information">Thông tin cá nhân</p>
            <div className="box-right">
              <div className="circle">
                <img src={notification} alt="" className="icon-notification" />
              </div>

              <div className="box-user">
                <img src={avarta} alt="" className="avarta" />
                <p className="hello">Hello</p>
                <p className="name">{account.name}</p>
              </div>
            </div>
          </div>
          <div className="box-information-user">
            <div className="col-avarta">
              <img src={avarta} alt="" className="infor-avarta" />
              <div className="circle-camera">
                <img src={circle} alt="" className="img-circle" />
                <img src={camera} alt="" className="camera" />
              </div>
              <p className="infor-name-user">{account.name}</p>
            </div>

            <div className="col-information-1">
              <div className="row-name-user">
                <p className="name">Tên người dùng</p>
                <input
                  type="text"
                  className="text-name"
                  disabled
                  value={account.name}
                />
              </div>
              <div className="row-phone-user">
                <p className="phone">Số điện thoại</p>
                <input
                  type="text"
                  value={account.phone}
                  className="text-phone"
                  disabled
                />
              </div>
              <div className="row-email-user">
                <p className="email">Email</p>
                <input
                  type="email"
                  value={account.email}
                  className="text-email"
                  disabled
                />
              </div>
            </div>
            <div className="col-information-2">
              <div className="row-id-user">
                <p className="id">Tên đăng nhập</p>
                <input
                  type="text"
                  value={account.userName}
                  className="text-id"
                  disabled
                />
              </div>
              <div className="row-password-user">
                <p className="password">Mật khẩu</p>
                <input
                  type="text"
                  value={account.password}
                  className="text-password"
                  disabled
                />
              </div>

              <div className="row-role-user">
                <p className="role">Vai trò</p>
                <input
                  type="text"
                  value={account.vaiTro}
                  className="text-role"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
