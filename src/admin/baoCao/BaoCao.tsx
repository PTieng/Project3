import React, { useEffect } from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "../baoCao/baoCao.css";
import { DatePicker, DatePickerProps, Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { CapSoType, fetchDataCapSo } from "../../redux/slice/CapSoSlice";
import { ColumnsType } from "antd/es/table";
import { UseAppSelector, useAppDispatch } from "../../redux/store/Store";
import { format } from "date-fns";

const BaoCao = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const dispatch = useAppDispatch();

  const capSo = UseAppSelector((state) => state.capSo.capSo);

  useEffect(() => {
    dispatch(fetchDataCapSo());
  }, [dispatch]);

  const columns: ColumnsType<CapSoType> = [
    {
      title: <p className="custom-table-header">Số thứ tự</p>,
      dataIndex: "stt",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: <p className="custom-table-header">Tên dịch vụ</p>,
      dataIndex: "serviceName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
    },
    {
      title: <p className="custom-table-header">Thời gian cấp</p>,
      dataIndex: "dateCap",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.dateCap.localeCompare(b.dateCap),
      render: (dateCap) => format(new Date(dateCap), "HH:mm - dd/MM/yyyy"),
    },
    {
      title: <p className="custom-table-header">Tình trạng</p>,
      dataIndex: "active",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.active.localeCompare(b.active),
    },
    {
      title: <p className="custom-table-header">Nguồn cấp</p>,
      dataIndex: "nguonCap",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.nguonCap.localeCompare(b.nguonCap),
    },
  ];

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
          <div className="table-baocao">
            <Table
              columns={columns}
              dataSource={capSo}
              bordered
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaoCao;
