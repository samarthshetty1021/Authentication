import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";

const Layout = (props) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header />
      <main className="flex-1 w-full flex flex-col pt-20">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
