import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import "../device/device.css";
import Header from "../component/header/Header";
import { Badge, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeviceType, fetchData } from "../../redux/slice/DeviceSlice";
import { RootState } from "../../redux/store/Store";
import addDevice from "../../images/addDevice.png";
import { Link, useNavigate } from "react-router-dom";
const Device = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [showAllService, setShowAllService] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleShowService = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowAllService(true);
  };

  const dispatch: any = useDispatch();
  const devices = useSelector((state: RootState) => state.devices.devices);
  const renderUsedService = (usedServices: string[] | string) => {
    if (Array.isArray(usedServices)) {
      if (showAllService) {
        return usedServices.join(", ");
      } else {
        return usedServices.slice(0, 2).join(", ");
      }
    } else {
      return usedServices;
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/admin/device/add");
  };
  const handleDetail = (id?: string) => {
    navigate(`/admin/device/detail/${id}`);
    console.log(id);
  };
  const columns = [
    {
      title: <p className="custom-table-header">ID Thiết bị</p>,
      dataIndex: "idTB",
      key: "idTB",
    },
    {
      title: <p className="custom-table-header">Tên Thiết bị</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="custom-table-header">Địa chỉ IP</p>,
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: <p className="custom-table-header">Trạng thái hoạt động</p>,
      dataIndex: "active",
      key: "active",
      render: (text: any, record: DeviceType) => {
        if (record.active === "Hoạt động")
          return <Badge status="success" text={record.active}></Badge>;

        if (record.active === "Ngưng hoạt động")
          return <Badge status="error" text={record.active}></Badge>;
      },
    },
    {
      title: <p className="custom-table-header">Trạng thái kết nối</p>,
      dataIndex: "connect",
      key: "connect",
      render: (text: any, record: DeviceType) => {
        if (record.connect === "Kết nối")
          return <Badge status="success" text={record.connect}></Badge>;

        if (record.connect === "Mất kết nối")
          return <Badge status="error" text={record.connect}></Badge>;
      },
    },
    {
      title: <p className="custom-table-header">Dịch vụ sử dụng</p>,
      dataIndex: "usedService",
      key: "usedService",
      render: (text: string[]) => (
        <p className="text-left">
          {renderUsedService(text)}
          <br />
          {!showAllService && text.length > 2 && (
            <a href="" onClick={handleShowService}>
              Xem thêm
            </a>
          )}
        </p>
      ),
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detial",
      render: (text: string, record: DeviceType) => (
        <>
          <a
            href=""
            className="text-center"
            onClick={() => handleDetail(record.id)}
          >
            Chi tiết
          </a>
        </>
      ),
    },
    {
      title: " ",
      dataIndex: "update",
      key: "update",
      render: (text: string) => (
        <Link to="" className="text-center">
          Cập nhật
        </Link>
      ),
    },
  ];

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="background-device">
        <SideBar />
        <Header
          firstTitle="Thết bị"
          secondTitle="Danh sách thiết bị"
          firtsPath="/admin/device"
        />
        <div className="content-device">
          <p className="title-listDevice">Danh sách thiết bị</p>
          <div className="row-select" style={{ display: "flex" }}>
            <div className="row-hoatDong">
              <p className="ttHoatDong">Trạng thái hoạt động</p>
              <Space wrap>
                <Select
                  className="select-hoatDong"
                  defaultValue="Tất cả"
                  style={{ width: 250 }}
                  onChange={handleChange}
                  options={[
                    { value: "tất Cả", label: "Tất cả" },
                    { value: "hoạt động", label: "Hoạt động" },
                    { value: "ngưng hoạt động", label: "Ngưng hoạt động" },
                  ]}
                />
              </Space>
            </div>
            <div className="row-hoatDong" style={{ left: "3%" }}>
              <p className="ttHoatDong" style={{ left: "-28%" }}>
                Trạng thái kết nối
              </p>
              <Space wrap>
                <Select
                  className="select-hoatDong"
                  defaultValue="Tất cả"
                  style={{ width: 250 }}
                  onChange={handleChange}
                  options={[
                    { value: "tất Cả", label: "Tất cả" },
                    { value: "kết nối", label: "kết nối" },
                    { value: "mất kết nối", label: "mất kết nối" },
                  ]}
                />
              </Space>
            </div>

            <div className="row-search-data">
              <p className="ttHoatDong" style={{ left: "-39%" }}>
                Từ khoá
              </p>
              <input
                type="text"
                className="input-search-device"
                placeholder="Nhập từ khoá"
              />
            </div>
          </div>

          {/* table */}
          <div className="table-antd-device">
            <Table
              columns={columns}
              dataSource={devices}
              pagination={{ pageSize: 2 }}
              bordered
            />
          </div>

          <div className="add-device" onClick={handleAdd}>
            {/* <button className="btn-addDevice"> */}
            <img src={addDevice} alt="" className="icon-add-device" />
            {/* </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;
