import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, theme } from "antd";
import Sidebar from "../Sidebar";
import MainHeader from "../Header";
import MainRouter from "../Router";
const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router basename="/">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Content
            style={{
              margin: 16,
              padding: 0,
              minHeight: 280,
              borderRadius: borderRadiusLG,
            }}
          >
            <MainRouter />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default MainLayout;
