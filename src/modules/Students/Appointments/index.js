import React, { useState, useEffect } from "react";
import { Table, Space, Card, Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import * as Http from "../../../utils/http.helper";
import "toastr/build/toastr.min.css";
import { useAppContext } from "../../../Context";

const AppointmentsManagement = (props) => {
  const { state, setLoading } = useAppContext();

  const [appPrevList, setAppPrevList] = useState([
    {
      id: 1,
      name: "Kerim Atena",
      test: "lorem impush ",
    },
    {
      id: 2,
      name: "test ats",
      test: "denemem impush ",
    },
  ]);
  const [appList, setAppList] = useState([
    {
      id: 1,
      name: "Talha erdğona",
      test: "deneme",
    },
  ]);
  const [appDrawer, setAppDrawer] = useState({
    show: false,
    data: null,
  });
  console.log(state);

  const getStundts = async () => {
    try {
      const res = await Http.get(`Appointments/${state.userInfo.id}`);
      setAppList(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    setLoading(true);
    getStundts();
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Test",
      dataIndex: "test",
      key: "test",
    },
  ];

  return (
    <>
      <Card
        type="inner"
        title="Randevu Listesi"
        style={{
          marginBottom: 15,
        }}
        hoverable
        extra={
          <Button
            type="primary"
            onClick={() => setAppDrawer({ show: true, data: null })}
            icon={<PlusOutlined />}
          >
            Randevu Oluştur
          </Button>
        }
      >
        <Table columns={columns} dataSource={appList} bordered />
      </Card>
      <Card
        type="inner"
        title="Geçmiş Randevu Listesi"
        style={{
          marginBottom: 15,
        }}
        hoverable
        extra={
          <Button
            type="primary"
            onClick={() => console.log("değerlendir")}
            icon={<PlusOutlined />}
          >
            Değerlendir
          </Button>
        }
      >
        <Table columns={columns} dataSource={appPrevList} bordered />
      </Card>
    </>
  );
};
export default AppointmentsManagement;
