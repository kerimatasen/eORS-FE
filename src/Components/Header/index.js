import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined, // Logout icon
} from "@ant-design/icons";
import { Button, Layout, theme, Dropdown, Avatar } from "antd";

const { Header } = Layout;

const items = (onLogout) => [
  {
    key: "1",
    label: "Hesabım",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
    extra: "⌘P",
    icon: <UserOutlined />,
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
  {
    type: "divider",
  },
  {
    key: "logout", // Unique key for logout
    label: "Logout",
    icon: <LogoutOutlined />,
    onClick: onLogout, // Call logout function passed as a parameter
  },
];
const MainHeader = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove userInfo and expiryTime from local storage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiryTime");

    // Navigate to login page
    navigate("/login");
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 25,
      }}
    >
      <Button
        type="text"
        icon={props?.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props?.setCollapsed(!props?.collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <Dropdown
        menu={{
          items: items(handleLogout),
        }}
      >
        <Avatar
          style={{
            cursor: "pointer",
            backgroundColor: "#f56a00",
          }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Header>
  );
};

export default MainHeader;
