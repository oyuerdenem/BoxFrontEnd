import {
  Row,
  Col,
  Card,
  Typography,
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

const project = [
  {
    title: "№",
    dataIndex: "_id",
    width: "50px",
    render: (data, index, key) => `${key+1}.`
  },
  {
    title: "Нэр",
    dataIndex: "Name",
    width: "32%"
  },
  {
    title: "Үнэ",
    dataIndex: "Price",
    render: (data) => `${data?.toLocaleString?.()} ₮`
  }
];

function Product() {
  const { Title } = Typography;

  const [product, setProduct] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [row, setRow] = useState();
  const [isAddModal, setIsAddModal] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState();

  const getAll = () => {
    // setLoadingProduct(true);
    axios.get('http://localhost:3000/product').then(res => {
      if (res.data.success) {
        setProduct(res.data.values);
      }
      setLoadingProduct(false);
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
    axios.delete('http://localhost:3000/product/' + row._id).then(res => {
      if (res.data.success) {
        getAll();
        setRow();
      }
    })
  }

  const handleAddProduct = (values) => {
    axios.post('http://localhost:3000/product', values).then(res => {
      console.log(res);
      if (res.data.success) {
        getAll();
        setIsAddModal(false);
      }
    })
  }

  const handleUpdateProduct = (values) => {
    axios.put('http://localhost:3000/product/' + row._id, values).then(res => {
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
                  <Title level={5}>Бараа</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group defaultValue="all" onChange={onChange}>
                      <Radio.Button value="all" onClick={getAll}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                      <Radio.Button disabled={!row} value="update" onClick={handleClickUpdate}>Засах</Radio.Button>
                      <Popconfirm title="Барааг устгах уу?" onConfirm={handleClickDelete}>
                        <Radio.Button disabled={!row} value="delete" >Устгах</Radio.Button>
                      </Popconfirm>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={product || []}
                  loading={loadingProduct || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                  onRow={e => ({
                    onClick: () => setRow(e)
                  })}
                  rowClassName={e => e._id === row?._id && 'active'}
                />
                {/* {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))} */}
              </div>
            </Card>
          </Col>
        </Row>

        <Drawer title="Бараа бүртгэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAddProduct}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Барааны нэрийг оруулна уу.' }]}>
              <Input placeholder="Барааны нэр" autoFocus />
            </Form.Item>

            <Form.Item name="Price" label="Үнэ" rules={[{ required: true, message: 'Барааны үнийг оруулна уу.' }]}>
              <Input type="number" min={0} placeholder="Барааны үнэ" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Бүртгэх</Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer title="Барааны мэдээлэл" visible={isUpdateModal} onClose={() => setIsUpdateModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleUpdateProduct} initialValues={row}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Барааны нэрийг оруулна уу.' }]}>
              <Input placeholder="Барааны нэр" autoFocus />
            </Form.Item>

            <Form.Item name="Price" label="Үнэ" rules={[{ required: true, message: 'Барааны үнийг оруулна уу.' }]}>
              <Input placeholder="Барааны үнэ" />
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

export default Product;