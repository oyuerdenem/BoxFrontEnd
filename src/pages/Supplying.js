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
import moment from 'moment';
import { Notification } from "../utils/utils";

const columns = [
  {
    title: "№",
    dataIndex: "_id",
    width: "50px",
    render: (data, index, key) => `${key + 1}.`
  },
  {
    title: "🗓️ Он - Сар - Өдөр",
    dataIndex: "DateAt",
    render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: "🫱🏻‍🫲🏼 Нийлүүлэгч",
    dataIndex: "SupplierId",
    render: (data) => data?.Name
  },
  {
    title: "🏡 Агуулах",
    dataIndex: "WarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "🏡 Бараа",
    dataIndex: "ProductId",
    render: (data) => data?.Name
  },
  {
    title: "Тоо ширхэг",
    dataIndex: "Quantity",
    width: "50px",
    render: (data) => <p style={{ textAlign: "end" }}>{`${data?.toLocaleString?.()} ш`}</p>
  },
  {
    title: "💸 Нийт үнэ",
    dataIndex: "Price",
    render: (data) => <p style={{ textAlign: "end" }}>{`${data?.toLocaleString?.()} ₮`}</p>
  }
];

function Supplying() {
  const { Title } = Typography;
  const [list, setList] = useState([]);
  const [loadingSupplying, setLoadingSupplying] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouse, setWarehouse] = useState([])
  const [supplier, setSupplier] = useState([])
  const [isAddModal, setIsAddModal] = useState();

  const getAllSupplying = () => {
    setLoadingSupplying(true);
    axios.get("http://localhost:3000/supplying", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res?.data.success) {
        setList(res?.data.values);
      }
      setLoadingSupplying(false);
    })
  }

  useEffect(() => {
    getAllSupplying();

    axios.get("http://localhost:3000/product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res?.data?.success) {
        setProducts(res?.data.values || [])
      }
    })

    axios.get("http://localhost:3000/warehouse", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res?.data?.success) {
        setWarehouse(res?.data.values || [])
      }
    })

    axios.get("http://localhost:3000/supplier", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res?.data?.success) {
        setSupplier(res?.data.values || [])
      }
    })
  }, []);

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const handleAdd = (values) => {
    //console.log(values.Quantity);
    if (!values?.Quantity) {
      Response("Тоо ширхэгийн мэдээлэл дээр алдаа гарлаа.", true);
    } else if (values?.Quantity < 1) {
      Response("Тоо ширхэгийн мэдээлэл буруу байна.", true);
    } else {
      const isInteger = /^\d+$/.test(values?.Quantity);
      console.log(isInteger)
      if (!isInteger) {
        Response("Тоо ширхэгийн мэдээлэл буруу байна.", true);
      } else {
        axios.post('http://localhost:3000/supplying', values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          if (res.data.success) {
            Notification(res.data, res.message, true);
            getAllSupplying();
            setIsAddModal(false);
          } else {
            Notification(res.data, res.message, true);
          }
        })
      }
    }
  }
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} >
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>✈️ Татан авалт</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="all" onClick={getAllSupplying}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>➕ Нэмэх</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={list || []}
                  loading={loadingSupplying || false}
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
            <Form.Item name="SupplierId" label="Илгээгч - Нийлүүлэгч" rules={[{ required: true, message: 'Нийлүүлэгчийг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {supplier.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="WarehouseId" label="Хүлээн авагч - Агуулах" rules={[{ required: true, message: 'Агуулахыг сонгоно уу.' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                // onChange={handleChange}
                children={<>
                  {warehouse.map(x => <Select.Option key={x?._id} value={x?.id} children={x?.Name} />)}
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
    </>
  );
}

export default Supplying;
