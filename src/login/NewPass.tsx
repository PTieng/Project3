import React, { useState } from "react";
import logoAlta from "../images/Logo alta.png";
import imgForgotPass from "../images/Frame.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const NewPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const clickShowPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prevShowPassWord) => !prevShowPassWord);
  };

  const clickShowPass2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword2((prevShowPassWord) => !prevShowPassWord);
  };
  const navigate = useNavigate();

  const handleConfrim = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="background-login">
        <div className="row">
          <div className="col-5 col-left">
            <img src={logoAlta} alt="" className="logoAlta" />
            <form action="">
              <p className="textNewPass">Đặt lại mật khẩu mới</p>
              <div className="boxNewPass">
                <p className="newPass">Mật khẩu *</p>
                <input
                  type={showPassword ? "text" : "password"}
                  className="inputNewPass"
                />
                <button className="btn-showPass1" onClick={clickShowPass}>
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

              <div className="boxConfrimPassword">
                <p className="confrimPass">Nhập lại mật khẩu *</p>
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="inputNewPass"
                />
                <button className="btn-showPass2" onClick={clickShowPass2}>
                  {showPassword2 ? (
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

              <button className="btn-confrim" onClick={handleConfrim}>
                Xác nhận
              </button>
            </form>
          </div>

          <div className="col-7 col-right">
            <img src={imgForgotPass} alt="" className="img_forgotPass" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
