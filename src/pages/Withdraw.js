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
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Нийлүүлэгч",
    dataIndex: "SupplierId",
    render: (data) => data?.name
  },
  {
    title: "Агуулах",
    dataIndex: "StorageId",
    render: (data) => data?.name
  },
  {
    title: "Бараа",
    dataIndex: "ProductId",
    render: (data) => data?.name
  },
  {
    title: "Тоо ширхэг",
    dataIndex: "Quantity"
  },
  {
    title: "Нийт үнэ",
    dataIndex: "Price"
  },
  {
    title: "Он - Сар - Өдөр",
    dataIndex: "dateAt"
  }
];

function Withdraw() {
  const { Title } = Typography;
  const [list, setList] = useState([]);

  const [products, setProducts] = useState([]);
  const [storage, setStorage] = useState([])
  const [supplier, setSupplier] = useState([])

  const [isAddModal, setIsAddModal] = useState();

  const getAllWithdraw = () => axios.get("http://localhost:3000/withdraw").then(res => {
    if (res?.data.success) {
      setList(res?.data.values);
    }
  })

  useEffect(() => {
    getAllWithdraw();

    axios.get("http://localhost:3000/product").then(res => {
      if (res?.data?.success) {
        setProducts(res?.data.values || [])
      }
    })

    axios.get("http://localhost:3000/storage").then(res => {
      if (res?.data?.success) {
        setStorage(res?.data.values || [])
      }
    })

    axios.get("http://localhost:3000/supplier").then(res => {
      if (res?.data?.success) {
        setSupplier(res?.data.values || [])
      }
    })
  }, []);

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const handleAdd = (values) => {
    console.log('values: ', values);
    axios.post('http://localhost:3000/withdraw', values).then(res => {
      console.log(res);
      if (res.data.success) {
        getAllWithdraw();
        setIsAddModal(false);
      }
    })
  }

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} >
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Татан авалт</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="all" onClick={getAllWithdraw}>Бүгд</Radio.Button>
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
            <Form.Item name="supplierId" label="Илгээгч - Нийлүүлэгч" rules={[{ required: true, message: 'Нийлүүлэгчийг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {supplier.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="storageId" label="Хүлээн авагч - Агуулах" rules={[{ required: true, message: 'Агуулахыг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {storage.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="productId" label="Бараа" rules={[{ required: true, message: 'Барааг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {products.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="quantity" label="Барааны тоо ширхэг" rules={[{ required: true, message: 'Нийлүүлсэн барааны тоо ширхэгийг оруулна уу.' }]}>
              <Input placeholder="Тоо ширхэг" />
            </Form.Item>

            <Form.Item name="name" label="">
              <Button htmlType="submit" type="primary">Хадгалах</Button>
            </Form.Item>
          </Form>
        </Drawer> 
      </div>
    </>
  );
}

export default Withdraw;
