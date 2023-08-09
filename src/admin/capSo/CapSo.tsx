import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "../capSo/capSo.css";
import { format } from "date-fns";

import { Badge, DatePicker, DatePickerProps, Select, Table } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/Store";
import { fetchDataService } from "../../redux/slice/ServiceSlice";
import { CaretRightOutlined } from "@ant-design/icons";
import searchIcon from "../../images/search-icon.png";
import { Option } from "antd/es/mentions";
import { CapSoType, fetchDataCapSo } from "../../redux/slice/CapSoSlice";
import { useNavigate } from "react-router-dom";
import newCapSo from "../../images/newCapSo.png";
const CapSo = () => {
  const handleChange = (value: string, type: string) => {
    console.log(`selected ${value}`);
    if (type === "service") {
      setSelectService(value);
    } else if (type === "active") {
      setSelectActive(value);
    } else if (type === "nguonCap") {
      setSelectNguonCap(value);
    }
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const navigate = useNavigate();
  const services = useSelector((state: RootState) => state.services.services);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDataService());
  }, [dispatch]);

  const capSo = useSelector((state: RootState) => state.capSo.capSo);

  useEffect(() => {
    dispatch(fetchDataCapSo());
  }, [dispatch]);
  console.log(capSo);

  const handleDetail = (id?: string) => {
    navigate(`/admin/capso/detail/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/capso/add");
  };
  const columns = [
    {
      title: <p className="custom-table-header">STT</p>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <p className="custom-table-header">Tên khách hàng</p>,
      dataIndex: "cusName",
      key: "cusName",
    },
    {
      title: <p className="custom-table-header">Tên dịch vụ</p>,
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: <p className="custom-table-header">Thời gian cấp</p>,
      dataIndex: "dateCap",
      key: "dateCap",
      render: (dateCap: string) => (
        <p className="timecap" style={{ marginTop: "15px" }}>
          {format(new Date(dateCap), "HH:mm - dd/MM/yyyy")}
        </p>
      ),
    },

    {
      title: <p className="custom-table-header">Hạn sử dụng</p>,
      dataIndex: "hsd",
      key: "hsd",
      render: (hsd: string) => (
        <p className="timecap" style={{ marginTop: "15px" }}>
          {format(new Date(hsd), "HH:mm - dd/MM/yyyy")}
        </p>
      ),
    },
    {
      title: <p className="custom-table-header">Trạng thái</p>,
      dataIndex: "active",
      key: "active",
      render: (text: any, record: CapSoType) => {
        if (record.active === "Đang chờ")
          return <Badge status="processing" text={record.active}></Badge>;

        if (record.active === "Đã sử dụng")
          return <Badge status="default" text={record.active}></Badge>;
        if (record.active === "Bỏ qua")
          return <Badge status="error" text={record.active}></Badge>;
      },
    },
    {
      title: <p className="custom-table-header">Nguồn cấp</p>,
      dataIndex: "nguonCap",
      key: "nguonCap",
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detial",
      render: (text: string, record: CapSoType) => (
        <>
          <span
            className="text-center"
            onClick={() => handleDetail(record.id)}
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Chi tiết
          </span>
        </>
      ),
    },
  ];

  const [selectService, setSelectService] = useState<string>("Tất cả");
  const [selectActive, setSelectActive] = useState<string>("Tất cả");
  const [selectNguonCap, setSelectNguonCap] = useState<string>("Tất cả");
  const [keyword, setKeyWord] = useState<string>("");

  const filterCapSo = capSo.filter((item) => {
    const isService =
      selectService === "Tất cả" || item.serviceName === selectService;
    const isActive = selectActive === "Tất cả" || item.active === selectActive;
    const isNguonCap =
      selectNguonCap === "Tất cả" || item.nguonCap === selectNguonCap;
    const isKeyWord =
      keyword === "" ||
      item.cusName.toLowerCase().includes(keyword.toLowerCase()) ||
      item.serviceName.toLowerCase().includes(keyword.toLowerCase());

    return isService && isActive && isNguonCap && isKeyWord;
  });

  return (
    <div>
      <div
        className="background-capSo"
        style={{
          display: "flex",
        }}
      >
        <SideBar />
        <Header
          firstTitle="Cấp số"
          secondTitle="Danh sách cấp số"
          firtsPath="/admin/capso"
        />
        <div className="content-capSo">
          <p className="title-capso">Quản lý cấp số</p>
          <div className="row-select-capso" style={{ display: "flex" }}>
            <div className="col-select-capSo">
              <p className="title-col-select-capSo">Tên dịch vụ</p>
              <Select
                defaultValue="Tất cả"
                className="select-name-service-capso"
                onChange={(value) => handleChange(value, "service")}
              >
                <Option value="Tất cả">Tất cả</Option>
                {services.map((service) => (
                  <Option key={service.id} value={service.name}>
                    {service.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-select-capSo" style={{ marginLeft: "2%" }}>
              <p className="title-col-select-capSo">Tình trạng</p>
              <Select
                defaultValue="Tất cả"
                className="select-name-service-capso"
                onChange={(value) => handleChange(value, "active")}
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  { value: "Đang chờ", label: "Đang chờ" },
                  { value: "Đã sử dụng", label: "Đã sử dụng" },
                  { value: "Bỏ qua", label: "Bỏ qua" },
                ]}
              />
            </div>
            <div className="col-select-capSo" style={{ marginLeft: "2%" }}>
              <p className="title-col-select-capSo">Nguồn cấp</p>
              <Select
                defaultValue="Tất cả"
                className="select-name-service-capso"
                onChange={(value) => handleChange(value, "nguonCap")}
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  { value: "Kiosk", label: "Kiosk" },
                  { value: "Hệ thống", label: "Hệ thống" },
                ]}
              />
            </div>
            <div
              className="col-select-capSo"
              style={{ marginLeft: "2%", width: "30%" }}
            >
              <p className="title-col-select-capSo">Chọn thời gian</p>
              <div
                className="row-date-capso"
                style={{
                  display: "flex",
                }}
              >
                <DatePicker onChange={onChange} />
                <CaretRightOutlined style={{ marginTop: "2.5%" }} />
                <DatePicker onChange={onChange} />
              </div>
            </div>
            <div className="col-select-capSo" style={{ marginLeft: 0 }}>
              <p className="title-col-select-capSo">Từ khoá</p>
              <input
                type="text"
                className="search-keywork-capso"
                placeholder="Nhập từ khoá"
                onChange={(e) => setKeyWord(e.target.value)}
              />
              <button className="btn-search-icon-capso">
                <img src={searchIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="row-table-capso">
            <Table
              columns={columns}
              pagination={{ pageSize: 4 }}
              bordered
              dataSource={filterCapSo}
            />
          </div>
          <button className="add-capso" onClick={handleAdd}>
            <img src={newCapSo} alt="" className="img-capSo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapSo;
