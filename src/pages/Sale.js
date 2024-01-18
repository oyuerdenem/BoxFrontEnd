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
    title: "🏡 Агуулах",
    dataIndex: "WarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "🏘️ Дэлгүүр",
    dataIndex: "StoreId",
    render: (data) => data?.Name
  },
  {
    title: "📦 Бараа",
    dataIndex: "ProductId",
    render: (data) => data?.Name
  },
  {
    title: "Тоо ширхэг",
    dataIndex: "Quantity",
    width: "50px",
    render: (data) => <p style={{textAlign: "end"}}>{`${data?.toLocaleString?.()} ш`}</p>
  },
  {
    title: "💸 Нийт үнэ",
    dataIndex: "Price",
    render: (data) => <p style={{textAlign: "end"}}>{`${data?.toLocaleString?.()} ₮`}</p>
  }
];

function Sale() {
  const [storage, setStorage] = useState([]);
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState([]);

  const [loading, setLoading] = useState(false);

  const [isAddModal, setIsAddModal] = useState();
  const { Title } = Typography;
  const [list, setList] = useState([]);

  const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

  const getAllSale = () => {
    setLoading(true);
    axios.get("http://localhost:3000/sale", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res?.data.success) {
        setList(res?.data.values);
      }
      setLoading(false);
    })
  }

  useEffect(() => {
    getAllSale();
    /**  */
    axios.get("http://localhost:3000/warehouse", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      console.log(res);
      if (res?.data?.success) {
        setStorage(res?.data.values || [])
      }
    })
    /**  */
    axios.get("http://localhost:3000/store", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      console.log(res);
      if (res?.data?.success) {
        setStore(res?.data.values || [])
      }
    })
    /**  */
    axios.get("http://localhost:3000/product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      console.log(res);
      if (res?.data?.success) {
        setProduct(res?.data.values || [])
      }
    })
  }, []);

  const handleAdd = (values) => {
    // console.log(values.Quantity);
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
        axios.post('http://localhost:3000/sale', values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          if (res.data.success) {
            Notification(res.data, res.message, true);
            getAllSale();
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
          <Col xs="24" xl={24}>
            <Card className="criclebox cardbody h-full" bordered={false}>
              <div className="project-ant">
                <div>
                  <Title level={5}>💰 Борлуулалт</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="all" onClick={getAllSale}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>➕ Нэмэх</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={list || []}
                  loading={loading || false}
                  pagination={false}
                  rowKey={row => row._id}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Drawer title="Борлуулалт нэмэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAdd}>
            <Form.Item name="WarehouseId" label="Агуулах" rules={[{ required: true, message: '' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                children={<>
                  {storage.map(x => <Select.Option key={x?._id} value={x?._id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="StoreId" label="Дэлгүүр" rules={[{ required: true, message: '' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                children={<>
                  {store.map(x => <Select.Option key={x?._id} value={x?._id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="ProductId" label="Бараа" rules={[{ required: true, message: '' }]}>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                children={<>
                  {product.map(x => <Select.Option key={x?._id} value={x?._id} children={x?.Name} />)}
                </>}
              />
            </Form.Item>
            <Form.Item name="Quantity" label="Тоо ширхэг" rules={[{ required: true, message: '' }]} >
              <Input placeholder="Тоо ширхэг" />
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

export default Sale;