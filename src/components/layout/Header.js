import {
  Row,
  Col,
  Button
} from "antd";

import {
  LogoutOutlined
} from "@ant-design/icons";
import { Notification } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    Notification({ success: true }, "Амжилттай бүртгэлээс гарлаа.")
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="header-control">
          <Button type="link" onClick={handleLogout}>
            Гарах &nbsp;&nbsp;
            <LogoutOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;