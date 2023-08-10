import React, { useEffect, useState } from "react";
import SideBar from "../../component/sideBar/SideBar";
import Header from "../../component/header/Header";
import "../add/addCapSo.css";
import { Form, Select, message } from "antd";
import { format } from "date-fns";
import { Option } from "antd/es/mentions";
import { UseAppSelector, useAppDispatch } from "../../../redux/store/Store";
import { fetchDataService } from "../../../redux/slice/ServiceSlice";
import { useNavigate } from "react-router-dom";
import { CapSoType, addCapSo } from "../../../redux/slice/CapSoSlice";
import { UserType } from "../../../redux/slice/UserSlice";
import { CloseOutlined } from "@ant-design/icons";
import { addUserLog } from "../../../redux/slice/UserLogSlice";

const AddCapSo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service = UseAppSelector((state) => state.services.services);

  const capSo = UseAppSelector((state) => state.capSo.capSo);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedNguonCap, setSelectedNguonCap] = useState<string>("");

  const dataAccount = localStorage.getItem("account");
  const account: UserType = dataAccount ? JSON.parse(dataAccount) : {};

  const [addedCapSo, setAddedCapSo] = useState<CapSoType | null>(null);
  const [stt, setStt] = useState<number>(20100);

  useEffect(() => {
    dispatch(fetchDataService());
  }, [dispatch]);

  const getRandomNguonCap = () => {
    const options = ["Kiosk", "Hệ thống"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const userLog = UseAppSelector((state) => state.userLog.userLog);

  const handleChangeSelect = async (value: any) => {
    setSelectedService(value);

    const selectedOptionIndex = service.findIndex((s) => s.name === value);
    const calculatedStt = 20100 + (selectedOptionIndex + 1) * 1;
    setStt(calculatedStt);
  };

  const handleAdd = async () => {
    if (!selectedService) {
      message.error("Vui lòng chọn dịch vụ");
      return;
    }
    const randomCounter = Math.ceil(Math.random() * 5);

    const randomActive = ["Đang chờ", "Đã sử dụng", "Bỏ qua"];
    const randomIndex = Math.floor(Math.random() * randomActive.length);
    const random = randomActive[randomIndex];

    const maxStt = capSo.reduce((max, capSo) => {
      return capSo.stt > max ? capSo.stt : max;
    }, 201000);

    const newCapSo = {
      serviceName: selectedService,
      stt: maxStt + 1,
      active: random,
      dateCap: new Date().toISOString(),
      hsd: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      nguonCap: selectedNguonCap || getRandomNguonCap(),
      cusName: account.name,
      quay: randomCounter,
    };

    const actionResult = await dispatch(addCapSo(newCapSo));

    if (addCapSo.fulfilled.match(actionResult)) {
      setAddedCapSo(actionResult.payload);
      setIsBoxVisible(true);
      message.success("Thêm cấp số thành công");
    }

    const newUserLog = {
      name: account.userName,
      time: new Date().toISOString(),
      ip: "192.168.3.1",
      action: `Thêm cấp số mới cho dịch vụ ${selectedService}`,
    };
    await dispatch(addUserLog(newUserLog));
  };

  const handleCloseModal = () => {
    setIsBoxVisible(false);
    navigate("/admin/capso");
  };

  const handleCancel = () => {
    navigate("/admin/capso");
  };
  return (
    <div>
      <div className="background-add-capso" style={{ display: "flex" }}>
        <SideBar />
        <Header
          firstTitle="Cấp số"
          secondTitle="Danh sách cấp số"
          thirdTitle="Cấp số mới"
          firtsPath="/admin/capso"
        />
        <div className="content-add-capso">
          <p className="title-add-capso">Quản lý cấp số</p>
          <div className="box-add-capso">
            <div className="form-add-capso">
              <p className="title-form-add-capso">Cấp số mới</p>
              <p className="name-form-add-capso">Dịch vụ khách hàng lựa chọn</p>

              <Form>
                <Form.Item name="nameService">
                  <Select
                    className="select-add-service-capso"
                    style={{
                      width: "100%",
                      color: "black",
                      marginTop: "25px",
                      textAlign: "left",
                    }}
                    onChange={handleChangeSelect}
                  >
                    {service.map((service) => (
                      <Option key={service.name} value={service.name}>
                        {service.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>

              <div className="row-button-add-capso" style={{ display: "flex" }}>
                <button className="cancel-capso" onClick={handleCancel}>
                  Huỷ bỏ
                </button>
                <button className="in-capso" onClick={handleAdd}>
                  In số
                </button>
              </div>

              <div
                className={`box-model-in-capso ${
                  isBoxVisible ? "visible" : ""
                }`}
              >
                <p className="soDuocCap">Số thứ tự được cấp</p>
                <p className="data-capso">{addedCapSo?.stt}</p>
                <p className="vd-service">
                  {addedCapSo?.serviceName}{" "}
                  <span>tại quầy số {addedCapSo?.quay}</span>{" "}
                </p>
                <div className="footer-model-inso">
                  <div className="col-timeCap">
                    <p className="timecap" style={{ textAlign: "left" }}>
                      Ngày cấp :{" "}
                      {addedCapSo && (
                        <span style={{ marginLeft: "9%" }}>
                          {format(
                            new Date(addedCapSo.dateCap),
                            "HH:mm - dd/MM/yyyy"
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="col-timeCap" style={{ marginTop: "-20px" }}>
                    <p className="timecap">
                      Hạn sử dụng :{" "}
                      {addedCapSo && (
                        <span>
                          {format(
                            new Date(addedCapSo.hsd),
                            "HH:mm - dd/MM/yyyy"
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <button className="btn-close-modal" onClick={handleCloseModal}>
                  <CloseOutlined style={{ color: "orange" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCapSo;
