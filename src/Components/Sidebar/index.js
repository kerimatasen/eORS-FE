import React from "react";
import {
  // UserOutlined,
  VideoCameraOutlined,
  FormOutlined,
  UserSwitchOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250} // Genişlik 250 piksel olacak
      collapsedWidth={80}
    >
      <div
        className="demo-logo-vertical"
        style={{
          width: "100%",
          height: 64,
          background: "#001529",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "100%", height: "auto", maxWidth: 100 }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={[
          {
            key: "1",
            label: "Öğrenci Yönetimi",
            icon: <MailOutlined />,
            children: [
              {
                key: "student",
                icon: <UserSwitchOutlined />,
                label: <Link to="/student-management">Öğrenci Paneli</Link>,
              },
              {
                key: "appointments",
                icon: <VideoCameraOutlined />,
                label: <Link to="/appointments-management">Randevular</Link>,
              },
            ],
          },
          {
            key: "2",
            label: "Öğretmen Yönetimi",
            icon: <MailOutlined />,
            children: [
              {
                key: "teacher",
                icon: <FormOutlined />,
                label: <Link to="/teacher-management">Yönetim Paneli</Link>,
              },
              {
                key: "3",
                icon: <FormOutlined />,
                label: <Link to="/menu3"> Programlar</Link>,
              },
            ],
          },
          {
            key: "course",
            icon: <VideoCameraOutlined />,
            label: <Link to="/course-management">Kurs Yönetimi</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
