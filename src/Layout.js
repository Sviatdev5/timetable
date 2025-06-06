import React from "react";
import Sidebar from "./Sidebar.js";
import "./Layout.css"; // стилі для layout

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
