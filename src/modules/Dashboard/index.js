import React from "react";
import { useAppContext } from "../../Context";

const Dashboard = () => {
  const { state } = useAppContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Yatayda ortalamak için
        alignItems: "center", // Dikeyde ortalamak için
        textAlign: "center",
        minHeight: "80vh",
      }}
    >
      <div>
        <h1>
          {state.userInfo?.name} {state.userInfo?.surName}
        </h1>
        <p>Welcome to the dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
