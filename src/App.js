import React from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { Students, Teachers, Dashboard, Appointments } from "./modules"; // Import from modules
import { LoginPage, MainLayout } from "./Components";
import MainPage from "./Components/MainPage";

toastr.options = {
  positionClass: "toast-top-right", // Change this to your desired position
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "3000",
  timeOut: "5000",
  extendedTimeOut: "5000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",

  // Other global options...
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main-page" />} />
      <Route path="/main-page" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-management" element={<Students />} />
        <Route path="/appointments-management" element={<Appointments />} />

        <Route path="/teacher-management" element={<Teachers />} />
      </Route>
    </Routes>
  );
}

export default App;
