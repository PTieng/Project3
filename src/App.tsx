import React from "react";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MyRoute from "./route/MyRoute";
import SideBar from "./admin/SideBar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
