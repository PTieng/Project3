import React, { useEffect, useState } from "react";
import "../service/service.css";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import { Select, Space, DatePicker, Table, Badge, DatePickerProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";
import { ServiceType, fetchDataService } from "../../redux/slice/ServiceSlice";
import addService from "../../images/addService.png";
import searchIcon from "../../images/search-icon.png";
import { CaretRightOutlined } from "@ant-design/icons";

const Service = () => {
  const handleChange = (value: string, serviceActive: string) => {
    console.log(`selected ${value}`);
    if (serviceActive === "activeService") {
      setSelectActive(value);
    }
  };
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const handleDetail = (id?: string) => {
    navigate(`/admin/service/detail/${id}`);
  };
  const services = useSelector((state: RootState) => state.services.services);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchDataService());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/admin/service/add");
  };

  const [selectActive, setSelectActive] = useState<string>("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const filterService = services.filter((services) => {
    const isSelecteActive =
      selectActive === "Tất cả" || services.activeService === selectActive;
    const isSearchKeyword =
      searchKeyword === "" ||
      services.name.toLowerCase().includes(searchKeyword) ||
      services.idService.toLowerCase().includes(searchKeyword) ||
      services.description.toLowerCase().includes(searchKeyword);
    return isSelecteActive && isSearchKeyword;
  });
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const columns = [
    {
      title: <p className="custom-table-header">Mã dịch vụ </p>,
      dataIndex: "idService",
      key: "idService",
    },
    {
      title: <p className="custom-table-header">Tên dịch vụ</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="custom-table-header">Mô tả</p>,
      dataIndex: "description",
      key: "description",
    },
    {
      title: <p className="custom-table-header">Trạng thái hoạt động</p>,
      dataIndex: "active",
      key: "active",
      render: (text: any, record: ServiceType) => {
        if (record.activeService === "Hoạt động")
          return <Badge status="success" text={record.activeService}></Badge>;

        if (record.activeService === "Ngưng hoạt động")
          return <Badge status="error" text={record.activeService}></Badge>;
      },
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detial",
      render: (text: string, record: ServiceType) => (
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
    {
      title: " ",
      dataIndex: "update",
      key: "update",
      render: (text: string, record: ServiceType) => (
        <span
          className="text-center"
          onClick={() => navigate(`/admin/service/add/${record.id}`)}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Cập nhật
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="background-service">
        <SideBar />
        <Header
          firstTitle="Dịch vụ"
          secondTitle="Danh sách dịch vụ"
          firtsPath="/admin/service"
        />
        <div className="content-service">
          <p className="title-service-page">Quản lý dịch vụ</p>

          <div className="row-select-service" style={{ display: "flex" }}>
            <div className="col-select-service-active">
              <p className="select-active-service">Trạng thái hoạt động</p>
              <Space wrap>
                <Select
                  className="select-hoatDong-service"
                  defaultValue="Tất cả"
                  style={{ width: 250, textAlign: "left", marginTop: "-5px" }}
                  onChange={(value) => handleChange(value, "activeService")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Hoạt động", label: "Hoạt động" },
                    { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
                  ]}
                />
              </Space>
            </div>
            <div
              className="col-select-service-active"
              style={{ marginLeft: "5%" }}
            >
              <p
                className="select-active-service"
                style={{ marginRight: "21%" }}
              >
                Chọn thời gian
              </p>
              <div className="date-service-select" style={{ display: "flex" }}>
                <DatePicker onChange={onChange} />
                <CaretRightOutlined style={{ marginTop: "5%" }} />
                <DatePicker onChange={onChange} />
              </div>
            </div>
            <div
              className="col-select-service-active"
              style={{ marginLeft: "21%" }}
            >
              <p
                className="select-active-service"
                style={{ marginRight: "39%" }}
              >
                Từ khoá
              </p>
              <input
                type="text"
                style={{ marginTop: "22px" }}
                className="input-search-service"
                placeholder="Nhập từ khoá"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button className="btn-search-service">
                {" "}
                <img src={searchIcon} alt="" />
              </button>
            </div>
          </div>
          <div
            className="table-antd-service"
            style={{ height: 400, marginTop: "1%" }}
          >
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              bordered
              dataSource={filterService}
            />
          </div>
          <div
            className="add-service"
            onClick={handleAdd}
            style={{ cursor: "pointer" }}
          >
            <img src={addService} alt="" className="icon-add-device" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
