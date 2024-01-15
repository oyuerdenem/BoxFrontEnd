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

const columns = [
  {
    title: "Нэр",
    dataIndex: "Name",
    width: "32%",
  },
  {
    title: "Байршил",
    dataIndex: "Location",
  },
];

function Store() {
  const { Title } = Typography;

  const [store, setStore] = useState([]);
  const [loadingStore, setLoadingStore] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [row, setRow] = useState();

  const getAll = () =>  {
    setLoadingStore(true)
    axios.get('http://localhost:3000/store').then(res => {
      if (res.data.success) {
        setStore(res.data.values);
      }
      setLoadingStore(false)
    })
  }

  useEffect(() => {
    getAll();
  }, [])

  const onChange = (e) => {
  };

  const handleAddStore = (values)=>{
    axios.post('http://localhost:3000/store', values).then(res => {
      console.log(res);
      if(res.data.success){
        getAll();
        setIsAddModal(false)
      }
    })
  }

  const handleUpdateStore =(values) => {
    axios.put('http://localhost:3000/store/' + row._id, values).then(res => {
      if(res.data.success){
        getAll();
        setIsUpdateModal(false)
      }
    })
  }

  const handleClickUpdate = () => {
    setIsUpdateModal(true);
  }

  const handleClickDelete = () => {
    axios.delete('http://localhost:3000/store/' + row._id).then(res => {
      if(res.data.success){
        getAll();
        setRow();
      }
    })
  }

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Дэлгүүр</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="all">
                      <Radio.Button value="all" onClick={getAll}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                      <Radio.Button disabled={!row} value="update" onClick={handleClickUpdate}>Засах</Radio.Button>
                      <Popconfirm title="Are u sure!" onConfirm={handleClickDelete}>
                        <Radio.Button disabled={!row} value="delete">Устгах</Radio.Button>
                      </Popconfirm>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={store || []}
                  pagination={false}
                  rowKey={row => row._id}
                  className="ant-border-space"
                  loading={loadingStore || false}
                  onRow={e => ({
                    onClick: () => setRow(e)
                  })}
                  rowClassName={e => e._id === row?._id && 'active'}
                />
              </div>
            </Card>
          </Col>
        </Row>


        <Drawer title="Дэлгүүр бүртгэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAddStore}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Дэлгүүрийн нэрийг оруулна уу.' }]}>
              <Input placeholder="Дэлгүүрийн нэр" autoFocus />
            </Form.Item>

            <Form.Item name="Location" label="Байршил" rules={[{ required: true, message: 'Дэлгүүрийн байршлыг оруулна уу.' }]}>
              <Input placeholder="Дэлгүүрийн байршил" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Бүртгэх</Button>
            </Form.Item>
          </Form>
        </Drawer> 
        {/* drawer bish table gej c bolno */}

        <Drawer title="Мэдээлэл засах" visible={isUpdateModal} onClose={() => setIsUpdateModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleUpdateStore} initialValues={row}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Дэлгүүрийн нэрийг оруулна уу.' }]}>
              <Input placeholder="Дэлгүүрийн нэр" />
            </Form.Item>

            <Form.Item name="Location" label="Байршил" rules={[{ required: true, message: 'Дэлгүүрийн байршлыг оруулна уу.' }]}>
              <Input placeholder="Дэлгүүрийн байршил" />
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

export default Store;