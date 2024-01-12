import {
  Card,
  Col,
  Row,
  Typography,
  Select,
  Radio,
  Table,
  Drawer,
  Form,
  Input,
  Button
} from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const columns = [

  {
    title: "Илгээгч агуулах",
    dataIndex: "SendWarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "Хүлээн авагч агуулах",
    dataIndex: "RecieveWarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "Бараа",
    dataIndex: "ProductId",
    render: (data) => data?.Name
  },
  {
    title: "Тоо ширхэг",
    dataIndex: "Quantity"
  },

  {
    title: "Он - Сар - Өдөр",
    dataIndex: "DateAt"
  }
];

function Movement() {
  const { Title } = Typography;
  const [list, setList] = useState([]);
  const [senderWarehouse, setSetsenderWarehouse] = useState();

  const [products, setProducts] = useState([]);
  const [warehouse, setWarehouse] = useState([])

  const [isAddModal, setIsAddModal] = useState();

  const getAllMovement = () => axios.get("http://localhost:3000/movement").then(res => {
    if (res?.data.success) {
      setList(res?.data.values);
    }
  })

  useEffect(() => {
    getAllMovement();

    axios.get("http://localhost:3000/product").then(res => {
      if (res?.data?.success) {
        setProducts(res?.data.values || [])
      }
    })

    axios.get("http://localhost:3000/warehouse").then(res => {
      if (res?.data?.success) {
        setWarehouse(res?.data.values || [])
      }
    })

  }, []);

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const handleAdd = (values) => {
    axios.post('http://localhost:3000/movement', values).then(res => {
      if (res.data.success) {
        getAllMovement();
        setIsAddModal(false);
      }
    })
  }

  const handleChangeSender = (e) => {
    setSetsenderWarehouse(e);
  };

  return (
    <Fragment>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} >
            <Card bordered={false} className="circlebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Хөдөлгөөн</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="all" onClick={getAllMovement}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={list || []}
                  // loading={loadingProduct || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                // onRow={e => ({
                //   onClick: () => setRow(e)
                // })}
                // rowClassName={e => e._id === row?._id && 'active'}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Drawer title="Бараа бүртгэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAdd}>
            <Form.Item name="SendWarehouseId" label="Илгээгч - Агуулах" rules={[{ required: true, message: 'Нийлүүлэгчийг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                onChange={handleChangeSender}
                children={<>
                  {warehouse.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="RecieveWarehouseId" label="Хүлээн авагч - Агуулах" rules={[{ required: true, message: 'Агуулахыг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {warehouse.map(x => x?._id !== senderWarehouse && <Select.Option key={x?._id} value={x?.id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="ProductId" label="Бараа" rules={[{ required: true, message: 'Барааг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {products.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="Quantity" label="Барааны тоо ширхэг" rules={[{ required: true, message: 'Нийлүүлсэн барааны тоо ширхэгийг оруулна уу.' }]}>
              <Input placeholder="Тоо ширхэг" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Хадгалах</Button>
            </Form.Item>

          </Form>
        </Drawer>
      </div>
    </Fragment>
  );
}

export default Movement;