import React, { useState, useEffect } from "react";
import { Layout, Spin, theme } from "antd";
import Sidebar from "../Sidebar";
import MainHeader from "../Header";
import { useAppContext } from "../../Context";
import { Outlet } from "react-router-dom"; // Outlet'i içe aktarın

const { Content } = Layout;

const MainLayout = () => {
  const { state, setLoading } = useAppContext();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Spin spinning={state?.loading} fullscreen tip="Loading..." />
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
