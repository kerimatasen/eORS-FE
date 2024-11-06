import React, { useEffect, useState } from "react";
import {
  Space,
  Button,
  Row,
  Col,
  Drawer,
  Form,
  Input,
  Spin,
  Select,
  DatePicker,
} from "antd";
import * as Http from "../../../../utils/http.helper";
import toastr from "toastr";
import { useAppContext } from "../../../../Context";

import "toastr/build/toastr.min.css";
import FormItem from "antd/es/form/FormItem";

const { TextArea } = Input;
const AddAppointmentsDrawer = (props) => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [refForm] = Form.useForm();
  useEffect(() => {
    // forma değer set etme
    if (props.appDrawer.data?.id) {
      refForm.setFieldsValue({
        ...props.appDrawer.data,
      });
    }
  }, [props]);

  useEffect(() => {
    // forma değer set etme
    if (state.userInfo?.id) {
      refForm.setFieldsValue({
        firstName: state.userInfo.name,
        lastName: state.userInfo.surName,
        userName: state.userInfo.email,
      });
    }
  }, [state]);

  const onClose = () => {
    // formu kapatma ve resetleme
    props.setAppDrawer({ show: false, data: null });
    // refForm.resetFields(); bunun yerine destroyOnClose etiketi drawera eklendi.
  };

  return (
    <Drawer
      title={
        props.appDrawer.data?.id
          ? `${props.appDrawer.data?.firstName} ${props.appDrawer.data?.lastName} Öğrencisini Güncelle`
          : "Randevu Oluştur"
      }
      size={"large"}
      onClose={() => onClose()}
      open={props.appDrawer.show}
      destroyOnClose // Default true değeri alır buda formun ve drawerın yok edilmesi için eklendi. Kapatma işleminden sonra drawer yok edilir.
      extra={
        <Space>
          <Button onClick={() => onClose()}>Vazgeç</Button>
          <Button
            onClick={() => {
              setLoading(true);
              refForm
                .validateFields()
                .then(() => {
                  // onSave();
                })
                .catch((err) => {
                  setLoading(false);
                });
            }}
            type="primary"
          >
            {props.appDrawer.data?.id ? "Güncelle" : "Kaydet"}
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading} tip="Loading...">
        <Form layout="vertical" form={refForm}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Öğrenci Adı"
                rules={[
                  {
                    required: true,
                    message: "Bu alan boş geçilemez",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Öğrenci Soyadı"
                rules={[
                  {
                    required: true,
                    message: "Bu alan boş geçilemez",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Bu alan boş geçilemez",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="course" label="Course">
                <Select
                  options={[
                    {
                      value: 1,
                      label: "Fizik",
                    },
                    {
                      value: 2,
                      label: "Bilgisayar Mühendisliği	",
                    },
                  ]}
                  showSearch
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lessonTopic" label="Lesson Topic">
                <Select
                  options={[
                    {
                      value: 1,
                      label: "Veri Yapıları",
                    },
                    {
                      value: 2,
                      label: "Sayısal Elektronik",
                    },
                    {
                      value: 3,
                      label: "Termodinamik",
                    },
                    {
                      value: 4,
                      label: "Yapı Dinamiği",
                    },
                    {
                      value: 5,
                      label: "Yöneylem Araştırması",
                    },
                  ]}
                  showSearch
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="teacher" label="Teacher">
                <Select
                  options={[
                    {
                      value: 1,
                      label: "Mehmet Yıldız",
                    },
                    {
                      value: 2,
                      label: "Ayşe Duman",
                    },
                    {
                      value: 3,
                      label: "Cavit Pekiyi",
                    },
                  ]}
                  showSearch
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="Date">
                <DatePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hour" label="Hour">
                <Select
                  options={[
                    {
                      value: 1,
                      label: "3:00-3:45",
                    },
                    {
                      value: 2,
                      label: "4:00-4:45",
                    },
                    {
                      value: 3,
                      label: "5:00-5:45",
                    },
                  ]}
                  showSearch
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};
export default AddAppointmentsDrawer;
