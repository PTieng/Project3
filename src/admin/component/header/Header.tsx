import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import React, { useEffect, useState } from "react";
import notification from "../../../images/notification2.png";
import avarta from "../../../images/avarta.avif";
import "../../component/header/header.css";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../redux/slice/UserSlice";
import { UseAppSelector, useAppDispatch } from "../../../redux/store/Store";
import { fetchDataCapSo } from "../../../redux/slice/CapSoSlice";
import format from "date-fns/format";

type Props = {
  firstTitle: string;
  secondTitle: string;
  thirdTitle?: string | null;
  firtsPath: string;
  secondPath?: string;
};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const [showHide, setShowHide] = useState(false);
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

  const handleShow = () => {
    setShowHide(!showHide);
  };

  const capSo = UseAppSelector((state) => state.capSo.capSo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataCapSo());
  }, [dispatch]);
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
          <img
            src={notification}
            alt=""
            className="notification-icon"
            onClick={handleShow}
          />
          {showHide && (
            <div className="nofitication-hide">
              <div className="header-nofitication-hide">
                <p className="thongbao">Thông báo</p>
              </div>

              <div className="row-nofitication-hide">
                {capSo.map((item, index) => (
                  <div
                    key={index}
                    className="row-data-capSo-nofitication-hide "
                    style={{ marginTop: "20px" }}
                  >
                    <p className="name-data-capSo-noti">
                      Người dùng:{" "}
                      <span style={{ marginLeft: "5%" }}>{item.cusName}</span>
                    </p>
                    <p className="time-data-capSo-noti">
                      Thời gian nhận số:{" "}
                      <span style={{ marginLeft: "1%" }}>
                        {format(new Date(item.dateCap), "HH:mm - dd/MM/yyyy")}
                      </span>
                    </p>
                    <hr className="hr-noti"/>
                  </div>
                ))}
              </div>
            </div>
          )}
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
