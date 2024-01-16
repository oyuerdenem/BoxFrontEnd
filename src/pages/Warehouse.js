import {
  Row,
  Typography,
  Col,
  Card,
  Radio,
  Table,
  Button,
  Form,
  Input,
  Drawer,
  Popconfirm,
} from "antd";

import { useEffect, useState } from "react";
import axios from "axios";
import { Notification } from "../utils/utils";

const project = [
  {
    title: "Нэр",
    dataIndex: "Name",
    width: "32%"
  },
  {
    title: "Байршил",
    dataIndex: "Location"
  }
];

function Warehouses() {
  const { Title } = Typography;

  const [warehouses, setWarehouses] = useState([]);
  const [loadingWarehouse, setLoadingWarehouse] = useState(false);
  const [row, setRow] = useState();
  const [isAddModal, setIsAddModal] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState();

  const getAll = () => {
    setLoadingWarehouse(true);
    axios.get('http://localhost:3000/warehouse').then(res => {
      if (res.data.success) {
        setWarehouses(res.data.values);
      }
      setLoadingWarehouse(false);
    })
  };

  useEffect(() => {
    getAll();
  }, []);

  const onChange = (e) => {
  };

  const handleClickUpdate = () => {
    setIsUpdateModal(true);
  }

  const handleClickDelete = () => {
    axios.delete('http://localhost:3000/warehouse/' + row._id).then(res => {
      Notification(res.data, res.data.message);
      if (res.data.success) {
        Notification(res.data, res.data.message, true);
        getAll();
        setRow();
      }
    })
  }

  const handleAddWarehouse = (values) => {
    axios.post('http://localhost:3000/warehouse', values).then(res => {
      if (res.data.success) {
        Notification(res.data, res.data.message, true);
        getAll();
        setIsAddModal(false);
      }
    })
  }

  const handleUpdateWarehouse = (values) => {
    axios.put('http://localhost:3000/warehouse/' + row._id, values).then(res => {
      if (res.data.success) {
        getAll();
        setIsUpdateModal(false);
      }
    })
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Агуулах</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group defaultValue="all" onChange={onChange}>
                      <Radio.Button value="all" onClick={getAll}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                      <Radio.Button disabled={!row} value="update" onClick={handleClickUpdate}>Засах</Radio.Button>
                      <Popconfirm title="Агуулахыг устгах уу?" onConfirm={handleClickDelete}>
                        <Radio.Button disabled={!row} value="delete" >Устгах</Radio.Button>
                      </Popconfirm>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={warehouses || []}
                  loading={loadingWarehouse || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                  onRow={e => ({
                    onClick: () => setRow(e)
                  })}
                  rowClassName={e => e._id === row?._id && 'active'}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Drawer title="Агуулах бүртгэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAddWarehouse}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Агуулахын нэрийг оруулна уу.' }]}>
              <Input placeholder="Агуулахын нэр" autoFocus />
            </Form.Item>

            <Form.Item name="Location" label="Байршил" rules={[{ required: true, message: 'Агуулахын байршлыг оруулна уу.' }]}>
              <Input placeholder="Агуулахын байршил" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Бүртгэх</Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer title="Агуулахын мэдээлэл" visible={isUpdateModal} onClose={() => setIsUpdateModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleUpdateWarehouse} initialValues={row}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Агуулахын нэрийг оруулна уу.' }]}>
              <Input placeholder="Агуулахын нэр" autoFocus />
            </Form.Item>

            <Form.Item name="Location" label="Байршил" rules={[{ required: true, message: 'Агуулахын байршлыг оруулна уу.' }]}>
              <Input placeholder="Агуулахын байршил" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Хадгалах</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </>
  )
}

export default Warehouses;