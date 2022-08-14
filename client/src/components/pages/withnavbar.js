import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar/navbar";

function WithNavBar() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default WithNavBar;
