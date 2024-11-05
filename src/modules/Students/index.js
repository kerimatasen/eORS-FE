import React, { useState, useEffect } from "react";
import * as Http from "../../utils/http.helper";
import { Table, Space, Card, Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddStudentsDrawer from "./AddStudentsDrawer";
import "toastr/build/toastr.min.css";
import { useAppContext } from "../../Context";

const Students = () => {
  const { setLoading } = useAppContext();

  const [studentList, setStudentList] = useState([]);
  const [studentsDrawer, setStudentsDrawer] = useState({
    show: false,
    data: null,
  });

  const getStundts = async () => {
    try {
      const res = await Http.get("students");
      setStudentList(res);
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
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
      title: "Öğrenci Adı/Soyadı",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (_, data) => {
        return data?.firstName + " " + data?.lastName;
      },
    },
    {
      title: "Kimlik Bilgisi",
      dataIndex: "tc",
      key: "tc",
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Veli Bilgisi",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Veli Mail ",
      dataIndex: "parentEmail",
      key: "parentEmail",
    },
    {
      title: "Veli Telefon",
      dataIndex: "parentPhone",
      key: "parentPhone",
    },
    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Sınıf",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "İşlemler",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="left" title="Öğrenci Düzenle">
            <Button
              type="primary"
              onClick={() => setStudentsDrawer({ show: true, data: record })}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Dikkat!"
            description={
              record.firstName +
              " " +
              record.lastName +
              " isimli öğrenciyi silmek istediğinizden emin misiniz?"
            }
            onConfirm={() => console.log("ok")}
            okText="Evet"
            cancelText="Hayır"
          >
            <Tooltip placement="left" title="Öğrenci Sil">
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
      title="Öğrenci Listesi"
      extra={
        <Button
          type="primary"
          onClick={() => setStudentsDrawer({ show: true, data: null })}
          icon={<PlusOutlined />}
        >
          Öğrenci Ekle
        </Button>
      }
    >
      <Table columns={columns} dataSource={studentList} bordered />
      {studentsDrawer.show && (
        <AddStudentsDrawer
          studentsDrawer={studentsDrawer}
          setStudentsDrawer={setStudentsDrawer}
          getStundts={getStundts}
        />
      )}
    </Card>
  );
};

export default Students;
