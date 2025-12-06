// src/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./App.jsx";       // preimenujem v AppLayout, da je bolj jasno
import Home from "./pages/Home.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* layout route */}
      <Route path="/" element={<AppLayout />}>
        {/* / -> AppLayout + Home */}
        <Route index element={<Home />} />
        {/* /home -> AppLayout + Home */}
        <Route path="home" element={<Home />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
