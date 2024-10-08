import React, { useEffect, useState } from "react";
import { Space, Button, Row, Col, Drawer, Form, Input, Spin } from "antd";
import * as Http from "../../../utils/http.helper";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const { TextArea } = Input;
const AddStudentsDrawer = (props) => {
  const [refForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // forma değer set etme
    if (props.studentsDrawer.data?.id) {
      //güncelleme işlemidir demek
      //   refForm.setFieldsValue({
      //     userName: props.studentsDrawer.data?.userName,
      //     firstName: props.studentsDrawer.data?.firstName,
      //     lastName: props.studentsDrawer.data?.lastName,
      //     tc: props.studentsDrawer.data?.tc,
      //     parentName: props.studentsDrawer.data?.parentName,
      //   });

      refForm.setFieldsValue({
        ...props.studentsDrawer.data,
      });
    }
  }, [props]);

  const onClose = () => {
    // formu kapatma ve resetleme
    props.setStudentsDrawer({ show: false, data: null });
    refForm.resetFields();
  };

  const onSave = () => {
    // formdan veri okuma ve kaydet güncelle işlemleri
    const formValues = refForm.getFieldsValue();
    console.log("formValues: ", formValues);

    if (!props.studentsDrawer.data?.id) {
      Http.post(`students`, {
        ...formValues,
      })
        .then((res) => {
          if (res?.success) {
            setLoading(false);
            toastr.success(
              `${formValues.firstName} ${formValues.lastName} isimli öğrenci kaydedilmiştir.`
            );
            refForm.resetFields();
            onClose();
          } else {
            console.log(res);
            setLoading(false);
            toastr.error(res?.Message);
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          toastr.error(error?.response?.data?.Message);
        });
    } else {
      alert("Güncelleme servisi hazır değil");
      setLoading(false);
    }
  };
  return (
    <Drawer
      title={
        props.studentsDrawer.data?.id
          ? `${props.studentsDrawer.data?.firstName} ${props.studentsDrawer.data?.lastName} Öğrencisini Güncelle`
          : "Öğrenci Ekle"
      }
      width={720}
      onClose={() => onClose()}
      open={props.studentsDrawer.show}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={() => onClose()}>Vazgeç</Button>
          <Button
            onClick={() => {
              setLoading(true);
              refForm
                .validateFields()
                .then(() => {
                  onSave();
                })
                .catch((err) => {
                  setLoading(false);
                });
            }}
            type="primary"
          >
            {props.studentsDrawer.data?.id ? "Güncelle" : "Kaydet"}
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
                <Input />
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="Kullanıcı Adı"
                rules={[
                  {
                    required: true,
                    message: "Bu alan boş geçilemez",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tc"
                label="TCKN"
                rules={[
                  {
                    required: true,
                    message: "Bu alan boş geçilemez",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="class" label="Sınıf">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="companyId" label="Okul Bilgisi">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Öğrenci Telefon">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Öğrenci Mail Adresi">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="image" label="Fotoğraf">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="parentName" label="Veli Bilgisi">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="parentPhone" label="Veli Telefon Bilgisi">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="parentEmail" label="Veli Mail Adresi">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="city" label="Şehir">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="district" label="İlçe">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Adres">
                <TextArea rows={4} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="password" label="Şifre">
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};
export default AddStudentsDrawer;
