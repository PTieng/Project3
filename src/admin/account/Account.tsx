import React, { useEffect, useState } from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "../account/account.css";
import { Badge, Select, Table } from "antd";
import { RootState, useAppDispatch } from "../../redux/store/Store";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserType, fetchDataUser } from "../../redux/slice/UserSlice";
import addUser from "../../images/addUser.png";
const Account = () => {
  const handleChange = (value: string, type: string) => {
    console.log(`selected ${value}`);
    if (type === "active") {
      setSelectActive(value);
    }
  };
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const users = useSelector((state: RootState) => state.users.users);

  const [selectActive, setSelectActive] = useState<string>("Tất cả");
  const [keyword, setKeyWord] = useState<string>("");
  const filterUser = users.filter((user) => {
    const isSelectActive =
      selectActive === "Tất cả" || user.vaiTro === selectActive;
    const searchKeyword =
      keyword === "" ||
      (user.userName && user.userName.toLowerCase().includes(keyword)) ||
      (user.name && user.name.toLowerCase().includes(keyword)) ||
      (user.phone && user.phone.toLowerCase().includes(keyword)) ||
      (user.email && user.email.toLowerCase().includes(keyword)) ||
      (user.vaiTro && user.vaiTro.toLowerCase().includes(keyword)) ||
      (user.active && user.active.toLowerCase().includes(keyword));
    return isSelectActive && searchKeyword;
  });

  useEffect(() => {
    dispatch(fetchDataUser());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/admin/account/add");
  };
  const columns = [
    {
      title: <p className="custom-table-header">Tên đăng nhập</p>,
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: <p className="custom-table-header">Họ tên</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="custom-table-header">Số điện thoại</p>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <p className="custom-table-header">Email</p>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <p className="custom-table-header">Vai trò</p>,
      dataIndex: "vaiTro",
      key: "vaiTro",
    },
    {
      title: <p className="custom-table-header">Trạng thái hoạt động</p>,
      dataIndex: "active",
      key: "active",
      render: (text: any, record: UserType) => {
        if (record.active === "Hoạt động")
          return <Badge status="success" text={record.active}></Badge>;

        if (record.active === "Ngưng hoạt động")
          return <Badge status="error" text={record.active}></Badge>;
      },
    },

    {
      title: " ",
      dataIndex: "update",
      key: "update",
      render: (text: string, record: UserType) => (
        <span
          className="text-center"
          onClick={() => navigate(`/admin/account/add/${record.id}`)}
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
      <div
        className="background-account"
        style={{
          display: "flex",
        }}
      >
        <SideBar />
        <Header
          firstTitle="Cài đặt hệ thống"
          secondTitle="Quản lý tài khoản"
          firtsPath="/admin/account"
        />
        <div className="content-account">
          <p className="title-account-content-account">Danh sách tài khoản</p>
          <div className="content-main-account">
            <div className="row-select-account" style={{ display: "flex" }}>
              <div className="col-select-vaitro">
                <p className="title-col-select-vaitro">Tên vai trò</p>
                <Select
                  defaultValue="Tất cả"
                  className="selcet-vaitro-account"
                  style={{ width: 200 }}
                  onChange={(value) => handleChange(value, "active")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Kế toán", label: "Kế toán" },
                    { value: "Quản lý", label: "Quản lý" },
                    { value: "Admin", label: "Admin" },
                  ]}
                />
              </div>
              <div className="col-select-vaitro2">
                <p className="title-col-select-vaitro">Từ khoá</p>
                <input
                  type="text"
                  className="search-keyword-account"
                  placeholder="Nhập từ khoá"
                  onChange={(e) => setKeyWord(e.target.value)}
                />
              </div>
            </div>
            <div className="table-account">
              <Table
                columns={columns}
                dataSource={filterUser}
                pagination={{ pageSize: 4 }}
                bordered
              />
            </div>
          </div>
          <button className="btn-add-userAccount" onClick={handleAdd}>
            <img src={addUser} alt="" className="img-add-user" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
