import React, { useEffect } from "react";
import SideBar from "../component/sideBar/SideBar";
import Header from "../component/header/Header";
import "../vaiTro/vaiTro.css";
import { Badge, Table } from "antd";
import { UseAppSelector, useAppDispatch } from "../../redux/store/Store";
import { useNavigate } from "react-router-dom";
import { VaiTroType, fetchDataVaiTro } from "../../redux/slice/VaiTroSlice";
import addVaiTro from "../../images/addVaiTro.png";
import { fetchDataUser } from "../../redux/slice/UserSlice";

const VaiTro = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleUpdate = (id?: string) => {
    navigate(`/admin/vaitro/add/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/vaitro/add");
  };

  const vaiTro = UseAppSelector((state) => state.vaiTro.vaiTro);
  const user = UseAppSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchDataUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataVaiTro());
  }, [dispatch]);

  const columns = [
    {
      title: <p className="custom-table-header">Tên vai trò</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="custom-table-header">Số người dùng</p>,
      dataIndex: "name",
      key: "roleCount",
      render: (vaiTro: string) => {
        const userCount = user.filter((user) => user.vaiTro === vaiTro).length;
        return <span>{userCount}</span>;
      },
    },
    {
      title: <p className="custom-table-header">Mô tả</p>,
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detial",
      render: (text: string, record: VaiTroType) => (
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
          <div
            className="row-search-keyword-vaitro"
            style={{ marginLeft: "-4%" }}
          >
            <p className="title-search-row-search-keyword-vaito">Từ khoá</p>
            <input
              type="text"
              className="input-search-row-search-keyword-vaitro"
              placeholder="Nhập từ khoá"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="content-main-vaitro">
              <Table
                columns={columns}
                pagination={{ pageSize: 4 }}
                bordered
                dataSource={vaiTro}
              />
            </div>
            <div>
              <button className="add-vaitro" onClick={handleAdd}>
                <img src={addVaiTro} alt="" className="img-add-vaitro" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaiTro;
