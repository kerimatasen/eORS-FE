import React, { useState, useEffect } from "react";
import * as Http from "../../utils/http.helper";
import { Spin, Table, Space, Card, Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import "toastr/build/toastr.min.css";
const Teachers = () => {
  const [loading, setLoading] = useState(true);
  const [teacherList, setTeacherList] = useState([]);

  const getTeachers = async () => {
    try {
      const res = await Http.get("teachers");
      setTeacherList(res);
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  console.log("teacherList: ", teacherList);

  const columns = [
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
      render: (value) => {
        return value;
      },
    },
    {
      title: "Öğretmen Adı/Soyadı",
      dataIndex: "name",
      key: "name",
      render: (_, data) => {
        return data?.name;
      },
    },
    {
      title: "Şehir",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="left" title="Öğretmen Düzenle">
            <Button
              type="primary"
              onClick={() => console.log({ show: true, data: record })}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Dikkat!"
            description={
              record.firstName +
              " " +
              record.lastName +
              " isimli öğretmeni silmek istediğinizden emin misiniz?"
            }
            onConfirm={() => console.log("ok")}
            okText="Evet"
            cancelText="Hayır"
          >
            <Tooltip placement="left" title="Öğretmen Sil">
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      type="inner"
      title="Öğretmen Listesi"
      extra={
        <Button
          type="primary"
          onClick={() => console.log({ show: true, data: null })}
          icon={<PlusOutlined />}
        >
          Öğretmen Ekle
        </Button>
      }
    >
      <Spin spinning={loading} fullscreen tip="Loading..." />
      <Table columns={columns} dataSource={teacherList} bordered />
    </Card>
  );
};

export default Teachers;
