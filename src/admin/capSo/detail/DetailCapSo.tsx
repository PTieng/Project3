import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../detail/detailCapSo.css";
import { RootState, useAppDispatch } from "../../../redux/store/Store";
import { useSelector } from "react-redux";
import { CapSoType, fetchDataCapSo } from "../../../redux/slice/CapSoSlice";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { UserType } from "../../../redux/slice/UserSlice";
const DetailCapSo = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: any = useAppDispatch();
  const [capSo, setCapSo] = useState<CapSoType>();
  const dataCapSo = useSelector((state: RootState) => state.capSo.capSo);
  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};

  useEffect(() => {
    const detail = dataCapSo.find((item) => item.id === id);
    dispatch(fetchDataCapSo());
    setCapSo(detail);
  }, [id, dataCapSo]);
  return (
    <div>
      <div className="background-detail-capso" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Thiết bị"
          secondTitle="Danh sách cấp số"
          thirdTitle="Chi tiết"
          firtsPath="/admin/capso"
        />
        <div className="content-detail-capso">
          <p className="title-content-detail-capso">Quản lý cấp số</p>
          <div className="box-detail-content-detail-capso">
            <p className="title-box-detail-capso">Thông tin cấp số</p>

            <div className="row-box-detail-capso" style={{ display: "flex" }}>
              <div className="col-row-box-detail-capso">
                <div
                  className="box-data-col-row-box-detail-capso"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Họ tên:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {account.name}
                    </p>
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Tên dịch vụ:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {capSo?.serviceName}
                    </p>
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Số thứ tự:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {capSo?.stt}
                    </p>
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Thời gian cấp:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    {capSo && capSo.dateCap && (
                      <p className="data-title-data-box-data-col-row-box-detail-capso">
                        {format(new Date(capSo.dateCap), "HH:mm - dd/MM/yyyy")}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Hạn sử dụng:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    {capSo && capSo.dateCap && (
                      <p className="data-title-data-box-data-col-row-box-detail-capso">
                        {format(new Date(capSo.hsd), "HH:mm - dd/MM/yyyy")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="col-row-box-detail-capso"
                style={{ marginLeft: "5%" }}
              >
                <div
                  className="box-data-col-row-box-detail-capso"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Nguồn cấp:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {capSo?.nguonCap}
                    </p>
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Trạng thái:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {capSo?.active}
                    </p>
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Số điện thoại:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {account.phone}
                    </p>
                  </div>
                </div>

                <div
                  className="box-data-col-row-box-detail-capso mt-2"
                  style={{ display: "flex" }}
                >
                  <div className="col-1-detail-capso" style={{ width: "30%" }}>
                    <p className="title-data-box-data-col-row-box-detail-capso">
                      Địa chỉ email:
                    </p>
                  </div>

                  <div className="col-2-detail-capso" style={{ width: "70%" }}>
                    <p className="data-title-data-box-data-col-row-box-detail-capso">
                      {account.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCapSo;
