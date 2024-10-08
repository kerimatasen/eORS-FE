import React from "react";
import { MainLayout } from "./Components";
import { MainProvider } from "./Context/MainProvider";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./App.css";

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
    <MainProvider>
      <MainLayout />
    </MainProvider>
  );
}

export default App;
