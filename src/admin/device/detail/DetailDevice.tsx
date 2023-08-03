import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../detail/detailDevice.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeviceType, fetchData } from "../../../redux/slice/DeviceSlice";
import { RootState } from "../../../redux/store/Store";
import update from "../../../images/update.png";
const DetailDevice = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: any = useDispatch();
  const [device, setDevice] = useState<DeviceType>();
  const data = useSelector((state: RootState) => state.devices.devices);

  useEffect(() => {
    const detail = data.find((item) => item.id === id);
    dispatch(fetchData());
    setDevice(detail);
    console.log(detail);
  }, [id, data]);

  const navigate = useNavigate();

  const handleuUpdateDevice = () => {
    navigate(`/admin/device/update/${id}`);
  };
  return (
    <div>
      <div className="background-detailDevice">
        <SideBar />
        <Header
          firstTitle="Thiết bị"
          secondTitle="Danh sách thiết bị"
          thirdTitle="Chi tiết thiết bị"
          firtsPath="/admin/device"
        />
        <div className="content-detailDevice">
          <p className="title-detail-device">Quản lý thiết bị</p>
          <div className="form-detail-device">
            <p className="thongTinDevice">Thông tin thiết bị</p>
            <div className="row-detail-device" style={{ display: "flex" }}>
              <div className="col-detail-device">
                <div className="detail-id-device">
                  <p className="idTB-label">Mã thiết bị:</p>
                  <div className="col-data-detail-device">
                    <p className="idTB text-left">{device?.idTB}</p>
                  </div>
                </div>
                <div className="detail-id-device mt-4">
                  <p className="idTB-label">Tên thiết bị:</p>
                  <div className="col-data-detail-device">
                    <p className="idTB text-left">{device?.name}</p>
                  </div>
                </div>
                <div className="detail-id-device mt-4">
                  <p className="idTB-label" style={{ marginLeft: "-8px" }}>
                    Địa chỉ IP:
                  </p>
                  <div className="col-data-detail-device">
                    <p className="idTB text-left">{device?.ip}</p>
                  </div>
                </div>
              </div>
              <div className="col-detail-device" style={{ marginLeft: "10%" }}>
                <div className="detail-id-device">
                  <p className="idTB-label">Loại thiết bị:</p>
                  <div className="col-data-detail-device">
                    <p
                      className="idTB text-left"
                      style={{ marginLeft: "18px" }}
                    >
                      {device?.type}
                    </p>
                  </div>
                </div>
                <div className="detail-id-device mt-4">
                  <p className="idTB-label" style={{ marginLeft: "16px" }}>
                    Tên đăng nhập:
                  </p>
                  <div className="col-data-detail-device">
                    <p
                      className="idTB text-left"
                      style={{ marginLeft: "18px" }}
                    >
                      {device?.userName}
                    </p>
                  </div>
                </div>
                <div className="detail-id-device mt-4">
                  <p className="idTB-label" style={{ marginLeft: "-13px" }}>
                    Mật khẩu:
                  </p>
                  <div className="col-data-detail-device">
                    <p
                      className="idTB text-left"
                      style={{ marginLeft: "18px" }}
                    >
                      {device?.password}
                    </p>
                  </div>
                </div>
              </div>
              <div className="dichVuSuDung">
                <p className="idTB-label" style={{ marginLeft: "-40px" }}>
                  Dịch vụ sử dụng:
                </p>
                <br />
                <p
                  className="idTB text-left"
                  style={{ marginLeft: "4px", marginTop: "-30px" }}
                >
                  {device?.usedService}
                </p>
              </div>
            </div>

            <div className="update-device">
              <button
                className="btn-update-device"
                onClick={handleuUpdateDevice}
              >
                <img src={update} alt="" className="img-update-device" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDevice;
