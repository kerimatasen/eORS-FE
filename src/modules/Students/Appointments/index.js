import React, { useState, useEffect } from "react";
import { Table, Space, Card, Button, Flex, Rate, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import * as Http from "../../../utils/http.helper";
import "toastr/build/toastr.min.css";
import { useAppContext } from "../../../Context";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import AddAppointmentsDrawer from "./addAppointments";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
const AppointmentsManagement = (props) => {
  const { state, setLoading } = useAppContext();
  const [rate, setRate] = useState(1);

  const [appPrevList, setAppPrevList] = useState([
    {
      id: 1,
      school: "Düzce Üniversitesi",
      teacher: "Mehmet Yılmaz",
      teacherEmail: "mehmet.yilmaz@duzce.edu.tr",
      teacherPhoneNumber: "0505 123 4567",
      courseName: "Bilgisayar Mühendisliği",
      dates_hour: "2024-10-01 / 2024-12-31",
      lessinTopic: "Veri Yapıları",
      note: "Öğrenciler projede başarılı.",
    },
    {
      id: 2,
      school: "Düzce Üniversitesi",
      teacher: "Ayşe Kaya",
      teacherEmail: "ayse.kaya@duzce.edu.tr",
      teacherPhoneNumber: "0506 987 6543",
      courseName: "Elektrik-Elektronik Mühendisliği",
      dates_hour: "2024-09-15 / 2024-12-15",
      lessinTopic: "Sayısal Elektronik",
      note: "Ders uygulamalı olarak işlenecek.",
    },
    {
      id: 3,
      school: "Düzce Üniversitesi",
      teacher: "Ahmet Demir",
      teacherEmail: "ahmet.demir@duzce.edu.tr",
      teacherPhoneNumber: "0504 321 9876",
      courseName: "Makine Mühendisliği",
      dates_hour: "2024-11-01 / 2025-01-30",
      lessinTopic: "Termodinamik",
      note: "Yeni laboratuvar ekipmanları kullanılacak.",
    },
    {
      id: 4,
      school: "Düzce Üniversitesi",
      teacher: "Zeynep Çelik",
      teacherEmail: "zeynep.celik@duzce.edu.tr",
      teacherPhoneNumber: "0505 678 1234",
      courseName: "İnşaat Mühendisliği",
      dates_hour: "2024-09-01 / 2024-12-15",
      lessinTopic: "Yapı Dinamiği",
      note: "Kapsamlı saha çalışmaları yapılacak.",
    },
    {
      id: 5,
      school: "Düzce Üniversitesi",
      teacher: "Hakan Şahin",
      teacherEmail: "hakan.sahin@duzce.edu.tr",
      teacherPhoneNumber: "0506 321 6549",
      courseName: "Kimya Mühendisliği",
      dates_hour: "2024-09-20 / 2024-12-20",
      lessinTopic: "Reaksiyon Mühendisliği",
      note: "Grup projeleri değerlendirilecek.",
    },
    {
      id: 6,
      school: "Düzce Üniversitesi",
      teacher: "Elif Korkmaz",
      teacherEmail: "elif.korkmaz@duzce.edu.tr",
      teacherPhoneNumber: "0507 987 1235",
      courseName: "Çevre Mühendisliği",
      dates_hour: "2024-10-10 / 2025-01-15",
      lessinTopic: "Çevre Kirliliği ve Kontrol",
      note: "Ödev teslimleri çevrimiçi yapılacak.",
    },
    {
      id: 7,
      school: "Düzce Üniversitesi",
      teacher: "Serkan Aydın",
      teacherEmail: "serkan.aydin@duzce.edu.tr",
      teacherPhoneNumber: "0508 456 7890",
      courseName: "Endüstri Mühendisliği",
      dates_hour: "2024-09-25 / 2024-12-25",
      lessinTopic: "Yöneylem Araştırması",
      note: "Ders projeleri büyük önem taşıyor.",
    },
    {
      id: 8,
      school: "Düzce Üniversitesi",
      teacher: "Fatma Güler",
      teacherEmail: "fatma.guler@duzce.edu.tr",
      teacherPhoneNumber: "0505 654 3210",
      courseName: "Mimarlık",
      dates_hour: "2024-09-05 / 2024-12-10",
      lessinTopic: "Tasarım Stüdyosu",
      note: "Yıl sonu sergisi düzenlenecek.",
    },
    {
      id: 9,
      school: "Düzce Üniversitesi",
      teacher: "Ali Vural",
      teacherEmail: "ali.vural@duzce.edu.tr",
      teacherPhoneNumber: "0506 123 0987",
      courseName: "Biyomedikal Mühendisliği",
      dates_hour: "2024-10-05 / 2024-12-25",
      lessinTopic: "Tıbbi Cihazlar",
      note: "Uygulamalı çalışmalar yürütülecek.",
    },
    {
      id: 10,
      school: "Düzce Üniversitesi",
      teacher: "Sevgi Yılmaz",
      teacherEmail: "sevgi.yilmaz@duzce.edu.tr",
      teacherPhoneNumber: "0507 765 4321",
      courseName: "Fizik",
      dates_hour: "2024-09-10 / 2024-12-20",
      lessinTopic: "Kuantum Mekaniği",
      note: "Ara sınav öncesi ek ders yapılacak.",
    },
  ]);
  const [appList, setAppList] = useState([
    {
      id: 1,
      school: "Düzce Üniversitesi",
      teacher: "Mehmet Yılmaz",
      teacherEmail: "mehmet.yilmaz@duzce.edu.tr",
      teacherPhoneNumber: "0505 123 4567",
      courseName: "Bilgisayar Mühendisliği",
      dates_hour: "2024-10-01 / 2024-12-31",
      lessinTopic: "Veri Yapıları",
      note: "Öğrenciler projede başarılı.",
    },
    {
      id: 2,
      school: "Düzce Üniversitesi",
      teacher: "Ayşe Kaya",
      teacherEmail: "ayse.kaya@duzce.edu.tr",
      teacherPhoneNumber: "0506 987 6543",
      courseName: "Elektrik-Elektronik Mühendisliği",
      dates_hour: "2024-09-15 / 2024-12-15",
      lessinTopic: "Sayısal Elektronik",
      note: "Ders uygulamalı olarak işlenecek.",
    },
    {
      id: 3,
      school: "Düzce Üniversitesi",
      teacher: "Ahmet Demir",
      teacherEmail: "ahmet.demir@duzce.edu.tr",
      teacherPhoneNumber: "0504 321 9876",
      courseName: "Makine Mühendisliği",
      dates_hour: "2024-11-01 / 2025-01-30",
      lessinTopic: "Termodinamik",
      note: "Yeni laboratuvar ekipmanları kullanılacak.",
    },
  ]);

  const [appDrawer, setAppDrawer] = useState({
    show: false,
    data: null,
  });
  const [modal, setModal] = useState({
    show: false,
    data: null,
  });
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
      width: 20,
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
    },

    {
      title: "Teacher Name SurName",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Teacher Email",
      dataIndex: "teacherEmail",
      key: "teacherEmail",
    },
    {
      title: "Teacher Phone",
      dataIndex: "teacherPhoneNumber",
      key: "teacherPhoneNumber",
    },
    {
      title: "Cours Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Course Start/End Date",
      dataIndex: "dates_hour",
      key: "dates_hour",
    },
    {
      title: "Lessin Topic",
      dataIndex: "lessinTopic",
      key: "lessinTopic",
    },
  ];
  const columnsPrev = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 20,
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
    },

    {
      title: "Teacher Name SurName",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Teacher Email",
      dataIndex: "teacherEmail",
      key: "teacherEmail",
    },
    {
      title: "Teacher Phone",
      dataIndex: "teacherPhoneNumber",
      key: "teacherPhoneNumber",
    },
    {
      title: "Cours Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Course Start/End Date",
      dataIndex: "dates_hour",
      key: "dates_hour",
    },
    {
      title: "Lessin Topic",
      dataIndex: "lessinTopic",
      key: "lessinTopic",
    },
    {
      title: "Notes",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: 200,
      render: (_, record) => {
        return (
          <Flex gap="middle" vertical>
            <Rate
              style={{ fontSize: 25, color: "blue" }}
              onChange={setRate}
              defaultValue={Math.floor(Math.random() * 5) + 1}
              character={({ index = 0 }) => customIcons[index + 1]}
            />
          </Flex>
          //    <Button
          //    type="primary"
          //    onClick={() => setModal({ show: true, data: record })}
          //    icon={<PlusOutlined />}
          //  >
          //    Değerlendir
          //  </Button>
        );
      },
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
        <Table columns={columns} dataSource={appList} bordered size="small" />
      </Card>
      <Card
        type="inner"
        title="Geçmiş Randevu Listesi"
        style={{
          marginBottom: 15,
        }}
        hoverable
      >
        <Table
          columns={columnsPrev}
          dataSource={appPrevList}
          bordered
          size="small"
        />
      </Card>
      {appDrawer?.show && (
        <AddAppointmentsDrawer
          appDrawer={appDrawer}
          setAppDrawer={setAppDrawer}
          setLoading={setLoading}
        />
      )}
      {/* {modal.show && (
        <Modal
          title={`${modal.data.teacher} isimli öğretmeni değerlendir.`}
          open={true}
          onOk={() => console.log("OK")}
          onCancel={() => setModal({ show: false, data: null })}
        >
          <Flex gap="middle" vertical>
            <Rate
              onChange={setRate}
              defaultValue={0}
              character={({ index = 0 }) => customIcons[index + 1]}
            />
          </Flex>
        </Modal>
      )} */}
    </>
  );
};
export default AppointmentsManagement;
