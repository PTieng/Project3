import React from "react";
import logoAlta from "../images/Logo alta.png";
import imgForgotPass from "../images/Frame.png";
import { useNavigate } from "react-router-dom";
const ForgotPass = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleNext = () => {
    navigate("/new/password");
  };
  return (
    <div>
      <div className="background-login">
        <div className="row">
          <div className="col-5 col-left">
            <img src={logoAlta} alt="" className="logoAlta" />
            <form action="">
              <p className="text-1-forPass">Đặt lại mật khẩu</p>
              <p className="text-2-forpass">
                Vui lòng nhập email để đặt lại mật khẩu của bạn *
              </p>
              <input type="email" className="input-forgotPass" />
              <div className="rowBtn">
                <button className="btnCancel" onClick={handleCancel}>
                  Huỷ
                </button>
                <button className="btnNext" onClick={handleNext}>
                  Tiếp tục
                </button>
              </div>
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

export default ForgotPass;
