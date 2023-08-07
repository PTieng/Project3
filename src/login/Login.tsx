import React, { useEffect } from "react";
import "./login.css";
import imgLogin from "../images/Group 341.png";
import logoAlta from "../images/Logo alta.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAppSelector, useAppDispatch } from "../redux/store/Store";
import { fetchDataUser } from "../redux/slice/UserSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const account = UseAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const clickShowPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prevShowPassWord) => !prevShowPassWord);
  };

  console.log(account);

  useEffect(() => {
    dispatch(fetchDataUser());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleLogin = () => {
    const user = account.find(
      (item) => item.userName === userName && item.password === password
    );
    if (user) {
      localStorage.setItem("account", JSON.stringify(user))
      navigate("/admin/dashboard");
    }
    console.log(user);
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
                <input
                  type="text"
                  className="inputName"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="userPassword">
                <p className="loginPass">Mật khẩu *</p>
                <input
                  type={showPassword ? "text" : "password"}
                  className="inputPass"
                  onChange={(e) => setPassWord(e.target.value)}
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
