import {
  Card,
  Col,
  Row,
  Typography,
  Table
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Илгээгч агуулах",
    dataIndex: "WarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "Бараа",
    dataIndex: "ProductId",
    render: (data) => data?.Name
  },
  {
    title: "Тоо ширхэг",
    dataIndex: "Quantity",
    render: (data) => `${data?.toLocaleString?.() || 0}ш`
  },
  {
    title: "Он - Сар - Өдөр",
    dataIndex: "DateAt"
  }
];

function Stock() {
  const { Title } = Typography;
  const [list, setList] = useState([]);

  const [loadingStock, setLoadingStock] = useState(false);

  const getAllStock = () => {
    setLoadingStock(true);
    axios.get("http://localhost:3000/stock").then(res => {
      if (res?.data?.success) {
        setList(res?.data?.values);
      }
      setLoadingStock(false);
    })
  }

  useEffect(() => {
    getAllStock();
  }, []);

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} >
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Нөөц</Title>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={list || []}
                  loading={loadingStock || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Stock;
