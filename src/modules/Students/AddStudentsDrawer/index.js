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
} from "antd";
import * as Http from "../../../utils/http.helper";
import cityDistrictData from "../../Data/cityDistrictData.json"; // data.json dosyasının doğru yolunu belirtin
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const { TextArea } = Input;
const AddStudentsDrawer = (props) => {
  const [refForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [districtByCityIdData, setDistrictByCityIdData] = useState([]);
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
    // refForm.resetFields(); bunun yerine destroyOnClose etiketi drawera eklendi.
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
          if (res) {
            setLoading(false);
            toastr.success(
              `${formValues.firstName} ${formValues.lastName} isimli öğrenci kaydedilmiştir.`
            );
            refForm.resetFields();
            onClose();
            props.getStundts();
          } else {
            setLoading(false);
            toastr.error(res?.Message);
          }
        })
        .catch(function (error) {
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
      size={"large"}
      onClose={() => onClose()}
      open={props.studentsDrawer.show}
      maskClosable={false} //Box dışı tıklamada drawer kapanmasın diye eklendi.
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
                <Select
                  options={cityDistrictData}
                  onChange={(e, data) => {
                    refForm.resetFields(["district"]);
                    setDistrictByCityIdData(
                      data?.district.map((item) => {
                        return { value: item, label: item };
                      })
                    );
                  }}
                  showSearch
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="district" label="İlçe">
                <Select
                  options={districtByCityIdData}
                  showSearch
                  disabled={districtByCityIdData.length === 0}
                  optionFilterProp="label"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                />
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
