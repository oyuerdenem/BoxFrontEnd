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
    title: "Агуулах",
    dataIndex: "WarehouseId", 
    render: (data) => data?.Name
  },
  {
    title: "Дэлгүүр",
    dataIndex: "StoreId",
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
    title: "Нийт үнэ",
    dataIndex: "Price"
  },
  {
    title: "Он - Сар - Өдөр",
    dataIndex: "DateAt"
  }
];

function Sale(){
  const [storage, setStorage] = useState([]);
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState([]);

  const [isAddModal, setIsAddModal] = useState();
  const {Title} = Typography; 
  const [list, setList] = useState([]);

  const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

  const getAllSale = () => axios.get("http://localhost:3000/sale").then(res => {
    if (res?.data.success){
      setList(res?.data.values);
    }
  });

  useEffect(() => {
    getAllSale();
    /**  */
    axios.get("http://localhost:3000/warehouse").then(res => {
      console.log(res);
      if (res?.data?.success) {
        setStorage(res?.data.values || [])
      }
    })
    /**  */
    axios.get("http://localhost:3000/store").then(res => {
      console.log(res);
      if(res?.data?.success){
        setStore(res?.data.values || [])
      }
    })
    /**  */
    axios.get("http://localhost:3000/product").then(res => {
      console.log(res);
      if(res?.data?.success){
        setProduct(res?.data.values || [])
      }
    })
  }, []);

  const handleAdd = (values) => {
    axios.post('http://localhost:3000/sale', values).then(res => {
      console.log(res);
      if(res.data.success){
        getAllSale();
        setIsAddModal(false);
      }
    })
  }
  return(
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card className="criclebox cardbody h-full" bordered={false}>
              <div className="project-ant">
                <div>
                  <Title level={5}>Борлуулалт</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="all" onClick={getAllSale}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                className= "ant-border-space"
                columns={columns}
                dataSource={list || []}
                pagination={false}
                rowKey={row => row._id}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Drawer title="Борлуулалт нэмэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAdd}>
            <Form.Item name="WarehouseId" label="Агуулах" rules={[{ required: true, message: ''}]}>
              <Select
              defaultValue=""
              style={{width: 200}}
              children={<>
                {storage.map(x=> <Select.Option key={x?._id} value={x?._id} children={x?.Name}/>)}
              </>}
              />
            </Form.Item>
            <Form.Item name="StoreId" label="Дэлгүүр" rules={[{ required: true, message: ''}]}>
              <Select
              defaultValue=""
              style={{width: 200}}
              children={<>
                {store.map(x=> <Select.Option key={x?._id} value={x?._id} children={x?.Name}/>)}
              </>}
              />
            </Form.Item>
            <Form.Item name="ProductId" label="Бараа" rules={[{ required: true, message: ''}]}>
              <Select
              defaultValue=""
              style={{width: 200}}
              children={<>
                {product.map(x=> <Select.Option key={x?._id} value={x?._id} children={x?.Name}/>)}
              </>}
              />
            </Form.Item>
            <Form.Item name="Quantity" label="Тоо ширхэг" rules={[{ required: true, message: ''}]} >
              <Input placeholder="Тоо ширхэг"/>
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