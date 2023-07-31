import React from "react";
import SideBar from "./SideBar";
import "../admin/dashboard.css";
import avarta from "../images/avarta.avif";
import notification from "../images/notification.png";

const Dashboard = () => {
  return (
    <div>
      <div className="background-dashboard">
        <SideBar />
        <div className="content">
          <div className="col-right-dashboard">
            <div className="box-user-dashboard">
              <div className="row-user-dashboard">
                <div className="circle-noticatio-dashboard">
                    <img src={notification} alt="" className="img-notification-dashboard"/>
                </div>
                .box-user-dashboard-header
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
