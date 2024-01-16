import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Notification } from "../utils/utils";
import axios from "axios";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default () => {

  const navigate = useNavigate();

  const onFinish = (values) => {
    axios.post('http://localhost:3000/user/signin', values)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("isLogged", true);
          Notification({ success: true }, "Амжилттай нэвтэрлээ.")
          navigate("/");
        } else {
          Notification({ success: false }, "Нэвтрэх нэр эсвэл нууц үг буруу байна.")
          navigate("/sign-in");
        }
      })
  }
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  }
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Нэвтрэх</Title>
              {/* <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title> */}
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Нэвтрэх нэр"
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "И-мэйл хаягаа оруулна уу!",
                    },
                  ]}
                >
                  <Input placeholder="Цахим хаяг" />
                </Form.Item>

                <Form.Item
                  className="password"
                  label="Нууц үг"
                  name="Password"
                  rules={[
                    {
                      required: true,
                      message: "Нууц үгээ оруулна уу!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Нууц үг" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Сануулах
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Нэвтрэх
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
