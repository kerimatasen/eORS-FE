import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";

const LoginPage = () => {
  const [refForm] = Form.useForm();
  const navigate = useNavigate();
  const { setUserInfo, setLoading } = useAppContext();

  const onFinish = (values) => {
    setLoading(true);
    const userInfo = {
      email: values.email,
      userName: values.email.split("@")[0],
    }; // Örnek kullanıcı bilgisi
    setUserInfo(userInfo); // Kullanıcı bilgilerini context'e kaydet
    navigate("/dashboard"); // Başarıyla giriş yaptıktan sonra yönlendir
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <h2>Login</h2>
      <Form
        name="loginForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={refForm}
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
