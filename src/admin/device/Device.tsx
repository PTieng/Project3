import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import "../device/device.css";
import Header from "../component/header/Header";
import { Badge, Popover, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeviceType, fetchData } from "../../redux/slice/DeviceSlice";
import { RootState } from "../../redux/store/Store";
import addDevice from "../../images/addDevice.png";
import { useNavigate } from "react-router-dom";
const Device = () => {
  const handleChange = (value: string, type: string) => {
    console.log(`selected ${value}`);
    if (type === "active") {
      setSelectActive(value);
    } else if (type === "connect") {
      setSelectConnect(value);
    }
  };

  const [showAllService, setShowAllService] = useState(false);
  const navigate = useNavigate();

  const dispatch: any = useDispatch();

  const devices = useSelector((state: RootState) => state.devices.devices);

  const renderUsedService = (usedServices: string[] | string) => {
    if (Array.isArray(usedServices)) {
      if (usedServices.length <= 2 || showAllService) {
        return usedServices.join(", ");
      } else {
        const truncatedServices = usedServices.slice(0, 2).join(", ");
        const remainingServices = usedServices.join(", ");
        return (
          <>
            {truncatedServices} {usedServices.length > 2 && "... "}
            <Popover
              placement="top"
              content={remainingServices}
              trigger="click"
            >
              <br />
              <span
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Xem thêm
              </span>
            </Popover>
          </>
        );
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
  };

  // select trạng thái

  const [selectActive, setSelectActive] = useState<string>("Tất cả");
  const [selectConnect, setSelectConnect] = useState<string>("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const filterDevice = devices.filter((device) => {
    const isSelecteActive =
      selectActive === "Tất cả" || device.active === selectActive;
    const isSelectConnect =
      selectConnect === "Tất cả" || device.connect === selectConnect;
    const isKeyWord =
      searchKeyword === "" ||
      device.idTB.toLowerCase().includes(searchKeyword) ||
      device.name.toLowerCase().includes(searchKeyword) ||
      device.ip.toLowerCase().includes(searchKeyword) ||
      (Array.isArray(device.usedService) &&
        device.usedService.some((service) =>
          service.toLowerCase().includes(searchKeyword)
        ));
    return isSelecteActive && isSelectConnect && isKeyWord;
  });

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
        <p className="text-left">{renderUsedService(text)}</p>
      ),
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detial",
      render: (text: string, record: DeviceType) => (
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
      render: (text: string, record: DeviceType) => (
        <span
          className="text-center"
          onClick={() => navigate(`/admin/device/add/${record.id}`)}
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
    <div style={{ overflow: "hidden" }}>
      <div className="background-device">
        <SideBar />
        <Header
          firstTitle="Thiết bị"
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
                  onChange={(value) => handleChange(value, "active")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Hoạt động", label: "Hoạt động" },
                    { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
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
                  onChange={(value) => handleChange(value, "connect")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Kết nối", label: "Kết nối" },
                    { value: "Mất kết nối", label: "Mất kết nối" },
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
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* table */}
          <div className="table-antd-device">
            <Table
              columns={columns}
              dataSource={filterDevice}
              pagination={{ pageSize: 4 }}
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
