import React from "react";
import "../detail/detailService.css";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
const DetailService = () => {
  return (
    <div>
      <div className="background-detail-service" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Dịch vụ"
          secondTitle="Danh sách dịch vụ"
          thirdTitle="Chi tiết"
          firtsPath="/admin/service"
        />
        <div className="content-detail-service">
          <p className="title-detail-service"> Quản lý dịch vụ</p>
          <div
            className="row-conent-service-detail"
            style={{ display: "flex" }}
          >
            <div className="col-detail-service-left">
              <p className="title-thongtindichvu">Thông tin dịch vụ</p>
              <div className="row-madichvu">
                <div className="col-row-madichvu">
                  <p className="madichvu-detail-service">Mã dịch vụ:</p>
                </div>
                <div className="col-row-madichvu2">
                  <p className="data-detail-service">ándlnsaln</p>
                </div>
              </div>
              <div className="row-madichvu ">
                <div className="col-row-madichvu">
                  <p className="madichvu-detail-service">Tên dịch vụ:</p>
                </div>
                <div className="col-row-madichvu2">
                  <p className="data-detail-service">ándlnsaln</p>
                </div>
              </div>
              <div className="row-madichvu">
                <div className="col-row-madichvu">
                  <p className="madichvu-detail-service">Mô tả:</p>
                </div>
                <div className="col-row-madichvu2">
                  <p className="data-detail-service">ándlnsaln</p>
                </div>
              </div>
              <div className="row-quyTacCapSo-detail-service mt-2">
                <p className="title-quyTacCapSo-detail-service">
                  Quy tắc cấp số
                </p>
                <div
                  className="row-qtcs-detail-service"
                  style={{ display: "flex" }}
                >
                  <div className="col-row-qtcs-detail-service">
                    <p className="madichvu-detail-service">Tăng tự động:</p>
                  </div>
                  <div
                    className="col-row-qtcs-detail-service"
                    style={{
                      width: 164,
                      display: "flex",
                    }}
                  >
                    <input
                      type="number"
                      className="input-col-row-qtcs-detail-service"
                    />
                    <p className="den-col-row-qtcs-detail-service">đến</p>
                    <input
                      type="number"
                      className="input-col-row-qtcs-detail-service"
                      style={{ marginLeft: "12%" }}
                    />
                  </div>
                </div>
                <div
                  className="row-qtcs-detail-service mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-row-qtcs-detail-service">
                    <p className="madichvu-detail-service">Prefix:</p>
                  </div>
                  <div
                    className="col-row-qtcs-detail-service"
                    style={{
                      width: 164,
                      display: "flex",
                    }}
                  >
                    <input
                      type="number"
                      className="input-col-row-qtcs-detail-service"
                    />
                  </div>
                </div>
                <div className="row-qtcs-detail-service mt-2">
                  <div className="col-row-qtcs-detail-service">
                    <p className="madichvu-detail-service">Reset mỗi ngày</p>
                    <p className="madichvu-detail-service-vd">
                      Ví dụ: 201-2001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-detail-service-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailService;
