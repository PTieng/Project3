import React from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "../baoCao/baoCao.css";
import { DatePicker, DatePickerProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const BaoCao = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <div className="background-baocao" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Báo cáo"
          secondTitle="Lập báo cáo"
          firtsPath="/admin/baocao"
        />
        <div className="content-baocao">
          <div className="row-select-baocao">
            <p className="title-baocao">Chọn thời gian</p>
            <div className="select-date-baocao">
              <DatePicker onChange={onChange} />
              <CaretRightOutlined />
              <DatePicker onChange={onChange} />
            </div>
          </div>
          <div className="table-baocao"></div>
        </div>
      </div>
    </div>
  );
};

export default BaoCao;
