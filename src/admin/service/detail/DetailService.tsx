import React, { useEffect, useState } from "react";
import "../detail/detailService.css";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, UseAppSelector } from "../../../redux/store/Store";
import {
  ServiceType,
  fetchDataService,
} from "../../../redux/slice/ServiceSlice";
import update from "../../../images/updateService.png";
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, DatePicker, DatePickerProps, Select, Table } from "antd";
import search from "../../../images/search-icon.png";
import prev from "../../../images/prev.png";
import { CapSoType, fetchDataCapSo } from "../../../redux/slice/CapSoSlice";
const DetailService = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch: any = useDispatch();
  const [service, setService] = useState<ServiceType>();
  const data = useSelector((state: RootState) => state.services.services);
  useEffect(() => {
    const detail = data.find((item) => item.id === id);
    dispatch(fetchDataService());
    setService(detail);
  }, [id, data]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const capSo = UseAppSelector((state) => state.capSo.capSo);

  useEffect(() => {
    dispatch(fetchDataCapSo());
  }, [dispatch]);

  const filterNameCapSo = capSo.filter(
    (item) => item.serviceName === service?.name
  );
  const columns = [
    {
      title: <p className="custom-table-header">Số thứ tự</p>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <p className="custom-table-header">Trạng thái</p>,
      dataIndex: "activeService",
      key: "activeService",
      render: (text: any, record: CapSoType) => {
        if (record.active === "Đã sử dụng")
          return <Badge status="success" text="Đã hoàn thành"></Badge>;

        if (record.active === "Đang chờ")
          return <Badge status="processing" text="Đang thực hiện"></Badge>;
        if (record.active === "Bỏ qua")
          return <Badge status="default" text="Vắng"></Badge>;
      },
    },
  ];

  const handleCancel = () => {
    navigate("/admin/service");
  };

  const handleDetail = (id?: string) => {
    navigate(`/admin/service/detail/${id}`);
  };

  const [selectActive, setSelectActive] = useState<string>("Tất cả");
  const [keyWord, setKeyWord] = useState<string>("");
  const filterActive = capSo.filter((item) => {
    const isSelecteActive =
      selectActive === "Tất cả" || item.active === selectActive;

    const isKeyWord =
      keyWord === "" || item.active.toLowerCase().includes(keyWord) || item.stt.toString().includes(keyWord);
    return isSelecteActive && isKeyWord;
  });

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
                  <p className="data-detail-service">{service?.idService}</p>
                </div>
              </div>
              <div className="row-madichvu ">
                <div className="col-row-madichvu">
                  <p className="madichvu-detail-service">Tên dịch vụ:</p>
                </div>
                <div className="col-row-madichvu2">
                  <p className="data-detail-service">{service?.name}</p>
                </div>
              </div>
              <div className="row-madichvu">
                <div className="col-row-madichvu">
                  <p className="madichvu-detail-service">Mô tả:</p>
                </div>
                <div className="col-row-madichvu2">
                  <p className="data-detail-service">{service?.description}</p>
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
            <div className="col-detail-service-right">
              <div
                className="row-select-detail-service"
                style={{ display: "flex" }}
              >
                <div className="col-select-active-detail-service">
                  <p className="title-trangThai">Trạng thái</p>
                  <Select
                    className="select-active-detail-service-1"
                    defaultValue="Tất cả"
                    style={{ width: 160, textAlign: "left" }}
                    onChange={handleChange}
                    options={[
                      { value: "Tất cả", label: "Tất cả" },
                      { value: "Đã hoàn thành", label: "Đã hoàn thành" },
                      { value: "Đã thực hiện ", label: "Đã thực hiện  " },
                      { value: "Vắng ", label: "Vắng" },
                    ]}
                  />
                </div>
                <div
                  className="col-select-active-detail-service2"
                  style={{ width: "38%" }}
                >
                  <p className="title-trangThai">Chọn thời gian</p>
                  <div style={{ display: "flex" }}>
                    <DatePicker
                      onChange={onChange}
                      className="start-date-detail-service"
                    />
                    <CaretRightOutlined />
                    <DatePicker
                      onChange={onChange}
                      className="start-date-detail-service "
                    />
                  </div>
                </div>
                <div
                  className="col-select-active-detail-service3"
                  style={{ width: "35%" }}
                >
                  <p className="title-trangThai">Từ khoá</p>
                  <input
                    type="text"
                    className="search-key-detail-service"
                    placeholder="Nhập từ khoá"
                  />
                  <button className="btn-search-detail-service">
                    <img
                      src={search}
                      alt=""
                      className="search-icon-detal-service"
                    />
                  </button>
                </div>
              </div>
              <div className="table-detail-service">
                <Table
                  columns={columns}
                  pagination={{ pageSize: 4 }}
                  dataSource={filterNameCapSo}
                  bordered
                />
              </div>
            </div>
            <div className="col-button-update-prev">
              <button
                className="btn-update-detail-service"
                onClick={() => handleDetail}
              >
                <img
                  src={update}
                  alt=""
                  style={{ width: 70 }}
                  className="img-btn-update-detail-service"
                />
              </button>
              <button
                className="btn-update-detail-service2"
                onClick={handleCancel}
              >
                <img
                  src={prev}
                  alt=""
                  style={{ width: 70 }}
                  className="img-btn-update-detail-service2"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailService;
