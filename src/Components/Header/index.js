import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme, Dropdown, Avatar } from "antd";
const { Header } = Layout;

const MainHeader = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items = [
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
  ];
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
          items,
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
