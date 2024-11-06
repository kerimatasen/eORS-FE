import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";
import usersData from "../../modules/Data/usersData.json"; // data.json dosyasının doğru yolunu belirtin
import toastr from "toastr";

const LoginPage = () => {
  const [refForm] = Form.useForm();
  const navigate = useNavigate();
  const { setUserInfo, setLoading } = useAppContext();

  const onFinish = (values) => {
    setLoading(true);
    const findUser = usersData.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (findUser && findUser?.id) {
      setUserInfo(findUser); // Kullanıcı bilgilerini context'e kaydet
      navigate("/dashboard"); // Başarıyla giriş yaptıktan sonra yönlendir
    } else {
      toastr.error("HATA MESAJI");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e90ff, #ffffff)",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form
          name="loginForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={refForm}
          layout="vertical"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate("/main-page")}
              style={{ marginRight: 15 }}
            >
              Go Back
            </Button>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
