import React from "react";

import { Container } from "reactstrap";

import AdminNavbar from "components/Navbars/AdminNavbar";
import AdminFooter from "components/Footers/AdminFooter";
import Sidebar from "components/Sidebar/Sidebar";

const Admin = ({ children }) => {
  return (
    <>
      <Sidebar
        logo={{
          innerLink: "/dashboard",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "VDO Dashboard",
        }}
      />
      <div className="main-content">
        <AdminNavbar brandText={""} />
        {children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
