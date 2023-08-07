import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import React from "react";
import notification from "../../../images/notification2.png";
import avarta from "../../../images/avarta.avif";
import "../../component/header/header.css";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../redux/slice/UserSlice";

type Props = {
  firstTitle: string;
  secondTitle: string;
  thirdTitle?: string | null;
  firtsPath: string;
  secondPath?: string;
};

const Header = (props: Props) => {
  const navigate = useNavigate();

  const handleInfor = () => {
    navigate("/admin/information");
  };
  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};
  const breadcrumbItems = [
    {
      title: props.firstTitle,
      style: { color: props.thirdTitle ? "defaultColor" : "#FF7506" },
    },
    {
      title: (
        <a
          href={props.firtsPath}
          style={{
            textDecoration: "none",
            color: props.thirdTitle ? "defaultColor" : "#FF7506",
            background: "none",
          }}
        >
          {props.secondTitle}
        </a>
      ),
    },
  ];

  if (props.thirdTitle) {
    breadcrumbItems.push({
      title: (
        <a
          href={props?.secondPath}
          style={{
            textDecoration: "none",
            color: "#FF7506",
            background: "none",
          }}
        >
          {props.thirdTitle}
        </a>
      ),
    });
  }

  return (
    <div
      className="width d-flex justify-content-between "
      style={{ background: "#F6F6F6" }}
    >
      <div>
        <Breadcrumb
          separator=">"
          className="header-main"
          items={breadcrumbItems}
        />
      </div>

      <div className="d-flex mt-4" style={{ marginLeft: "-25px" }}>
        <div className="me-4">
          <img src={notification} alt="" className="notification-icon" />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <img
              src={avarta}
              alt=""
              style={{ cursor: "pointer", borderRadius: "50%" }}
              onClick={handleInfor}
              width={40}
              height={40}
            />
          </div>
          <div className="d-flex flex-column">
            <p className="mb-2 hello-header">Xin chào</p>
            <p
              className="mb-4 ms-5 name-header"
              style={{ cursor: "pointer" }}
              onClick={handleInfor}
            >
              {account.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
