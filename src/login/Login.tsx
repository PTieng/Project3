import React from "react";
import "./login.css";
import imgLogin from "../images/Group 341.png";
import logoAlta from "../images/Logo alta.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const clickShowPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prevShowPassWord) => !prevShowPassWord);
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/admin/dashboard");
  };
  return (
    <div>
      <div className="background-login">
        <div className="row">
          <div className="col-5 col-left">
            <img src={logoAlta} alt="" className="logoAlta" />
            <form action="">
              <div className="userName">
                <p className="loginName">Tên đăng nhập *</p>
                <input type="text" className="inputName" />
              </div>

              <div className="userPassword">
                <p className="loginPass">Mật khẩu *</p>
                <input
                  type={showPassword ? "text" : "password"}
                  className="inputPass"
                />
                <button className="btn-showPass" onClick={clickShowPass}>
                  {showPassword ? (
                    <EyeOutlined
                      className="showPass"
                      style={{ opacity: 0.5 }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      className="showPass"
                      style={{ opacity: 0.5 }}
                    />
                  )}
                </button>
              </div>

              <a href="/forgot/password" className="forgotPass">
                Quên mật khẩu?
              </a>

              <button className="btn-login" onClick={handleLogin}>
                Đăng nhập
              </button>
            </form>
          </div>

          <div className="col-7 col-right">
            <img src={imgLogin} alt="" className="img_login" />
            <p className="text-1">Hệ thống</p>
            <p className="text-2">QUẢN LÝ XẾP HÀNG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
