import React, { useEffect } from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "../vaiTro/vaiTro.css";
import { Badge, Table } from "antd";
import { UseAppSelector, useAppDispatch } from "../../redux/store/Store";
import { UserType, fetchDataUser } from "../../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";

const VaiTro = () => {
  const navigate = useNavigate();

  const users = UseAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataUser());
  }, [dispatch]);

  const handleUpdate = (id?: string) => {
    navigate(`/admin/baocao/update/${id}`);
  };
  const uniqueRoles = Array.from(new Set(users.map((user) => user.vaiTro)));
  const roleData = uniqueRoles.map((role) => ({ vaiTro: role }));
  const columns = [
    {
      title: <p className="custom-table-header">Tên vai trò</p>,
      dataIndex: "vaiTro",
      key: "vaiTro",
    },
    {
      title: <p className="custom-table-header">Số người dùng</p>,
      dataIndex: "vaiTro",
      key: "roleCount",
      render: (vaiTro: string) => {
        const roleUsers = users.filter((user) => user.vaiTro === vaiTro);
        return <span>{roleUsers.length}</span>;
      },
    },
    {
      title: <p className="custom-table-header">Mô tả</p>,
      dataIndex: "",
      key: "",
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detial",
      render: (text: string, record: UserType) => (
        <>
          <span
            className="text-center"
            onClick={() => handleUpdate(record.id)}
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Cập nhật
          </span>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="background-vaitro" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Cài đặt hệ thống"
          secondTitle="Quản lý vai trò"
          firtsPath="/admin/vaitro"
        />
        <div className="content-vaitro">
          <p className="title-vaitro">Danh sách vai trò</p>
          <div className="row-search-keyword-vaitro">
            <p className="title-search-row-search-keyword-vaito">Từ khoá</p>
            <input
              type="text"
              className="input-search-row-search-keyword-vaitro"
              placeholder="Nhập từ khoá"
            />
          </div>
          <div className="content-main-vaitro">
            <Table
              columns={columns}
              pagination={{ pageSize: 4 }}
              bordered
              dataSource={roleData as UserType[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaiTro;
