import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";
import "../style/footer.css";
import "../style/header.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
