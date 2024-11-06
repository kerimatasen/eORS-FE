import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Sidebar from "../Sidebar";
import MainHeader from "../Header";
import { useAppContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import HomePage from "./Home";
import AboutPage from "./About";
import ContactPage from "./Contact";

const { Header, Content, Footer, Sider } = Layout;

const items2 = [
  {
    key: "1",
    label: "Anasayfa",
    icon: <LaptopOutlined />,
  },
  {
    key: "2",
    label: "Hakkımızda",
    icon: <LaptopOutlined />,
  },
  {
    key: "3",
    label: "İletişim",
    icon: <LaptopOutlined />,
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const goLogin = () => {
    navigate("/login");
  };
  console.log(current);
  return (
    <Layout>
      <Content>
        <Layout
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              onClick={onClick}
              style={{
                height: "100%",
                paddingTop: 50,
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "24px",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginBottom: 15,
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                style={{ minWidth: 150 }}
                onClick={() => goLogin()}
              >
                Go Login Page
              </Button>
            </div>
            {current === "1" ? (
              <HomePage />
            ) : current === "2" ? (
              <AboutPage />
            ) : (
              <ContactPage />
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default MainPage;
