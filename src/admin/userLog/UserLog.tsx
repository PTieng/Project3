import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "./user.css";
import { CaretRightOutlined } from "@ant-design/icons";

import { DatePicker, DatePickerProps, Table } from "antd";
import { UseAppSelector, useAppDispatch } from "../../redux/store/Store";
import { fetchDataUserLog } from "../../redux/slice/UserLogSlice";
import { UserType } from "../../redux/slice/UserSlice";
import moment from "moment";
import searchIcon from "../../images/search-icon.png";

const UserLog = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};

  const userLog = UseAppSelector((state) => state.userLog.userLog);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataUserLog());
  }, [dispatch]);

  const columns = [
    {
      title: <p className="custom-table-header">Tên đăng nhập</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="custom-table-header">Thời gian tác động</p>,
      dataIndex: "time",
      key: "time",
      render: (time: string) => (
        <span>{moment(time).format("DD/MM/YYYY HH:mm:ss")}</span>
      ),
    },
    {
      title: <p className="custom-table-header">IP thực hiện</p>,
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: <p className="custom-table-header">Thao tác thực hiện</p>,
      dataIndex: "action",
      key: "action",
    },
  ];

  const [keyWord, setKeyWord] = useState<string>("");

  const filterSearch = userLog.filter((item) => {
    const isSearch =
      keyWord === "" ||
      item.name.toLowerCase().includes(keyWord) ||
      item.action.toLowerCase().includes(keyWord) ||
      item.time.toLowerCase().includes(keyWord) ||
      item.ip.toLowerCase().includes(keyWord);
    return isSearch;
  });

  return (
    <div>
      <div className="background-userlog" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Cài đặt hệ thống"
          secondTitle="Nhật ký hoạt động"
          firtsPath="/admin/user"
        />
        <div className="content-userLog">
          <div className="row-select-baocao">
            <p className="title-baocao">Chọn thời gian</p>
            <div className="select-date-baocao">
              <DatePicker onChange={onChange} />
              <CaretRightOutlined />
              <DatePicker onChange={onChange} />
            </div>
            <div className="col-select-vaitro2-userlog">
              <p className="title-col-select-vaitro">Từ khoá</p>
              <input
                type="text"
                className="search-keyword-account"
                placeholder="Nhập từ khoá"
                onChange={(e) => setKeyWord(e.target.value)}
              />
              <button className="btn-search-userLog">
                {" "}
                <img src={searchIcon} alt="" />
              </button>
            </div>
          </div>

          <div className="table-userLog">
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              bordered
              dataSource={filterSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLog;
