// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import TabNavigation from "./components/tab-navigation/TabContainer";

export default function AppLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#db4242",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* meni */}
      <TabNavigation />

      {/* tukaj se izriše Home (in druge strani) */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
