import {
    Row,
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

const project = [
    {
        title: "Нэр",
        dataIndex: "name",
        width: "32%"
    },
    {
        title:"Байршил",
        dataIndex: "location"
    }
];

function Supplier(){

    const [supplier, setSupplier] = useState([]);
    const [loadingSupplier, setLoadingSupplier] = useState(false);
    const [row, setRow] = useState();
    const [isAddModal, setIsAddModal] = useState();
    const [isUpdateModal, setIsUpdateModal] = useState();

    const getAll = () => {
        setLoadingSupplier(true);
        axios.get('http://localhost:3000/supplier').then(res => {
            if(res.data.success) {
                setSupplier(res.data.values);
                console.log(res.data.values);
            }
            setLoadingSupplier(false);
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
        axios.delete('http://localhost:3000/supplier/' + row._id).then(res => {
            if(res.data.success){
                getAll();
                setRow();
            }
        })
    }

    const handleAddSupplier = (values) => {
        console.log('values: ', values);
        axios.post('http://localhost:3000/supplier', values).then(res => {
            console.log(res);
            if (res.data.success) {
                getAll();
                setIsAddModal(false);
            }
        })
    }

    const handleUpdateSupplier =(values) => {
        axios.put('http://localhost:3000/supplier/' + row._id, values).then(res => {
          if(res.data.success){
            getAll();
            setIsUpdateModal(false)
          }
        })
      }

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Нийлүүлэгч"
                            extra={
                                <>
                                    <Radio.Group defaultValue="all" onChange={onChange}>
                                        <Radio.Button value="all" onClick={getAll}>Бүгд</Radio.Button>
                                        <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                                        <Radio.Button disabled={!row} value="update" onClick={handleClickUpdate}>Засах</Radio.Button>
                                        <Popconfirm title="Нийлүүлэгчийг устгах уу?" onConfirm={handleClickDelete}>
                                            <Radio.Button disabled={!row} value="delete" >Устгах</Radio.Button>
                                        </Popconfirm> 
                                    </Radio.Group>
                                </>
                            }>
                            <div className="table-responsive">
                                <Table
                                    columns={project}
                                    dataSource={supplier || []}
                                    loading={loadingSupplier || false}
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

                <Drawer  title="Нийлүүлэгч бүртгэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
                    <Form layout="vertical" onFinish={handleAddSupplier}>
                        <Form.Item name="name" label="Нэр" rules={[{required: true, message: 'Нийлүүлэгчийн нэрийг оруулна уу.'}]}>
                            <Input placeholder="Нийлүүлэгчийн нэр" autoFocus/>
                        </Form.Item>

                        <Form.Item name="location" label="Байршил" rules={[{required: true, message: 'Нийлүүлэгчийн байршлыг оруулна уу.'}]}>
                            <Input placeholder="Нийлүүлэгчийн байршил"/>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" type="primary">Бүртгэх</Button>
                        </Form.Item>
                    </Form>
                </Drawer>

                <Drawer title="Мэдээлэл засах" visible={isUpdateModal} onClose={() => setIsUpdateModal(false)} footer={false} destroyOnClose>
                  <Form layout="vertical" onFinish={handleUpdateSupplier} initialValues={row}>
                      <Form.Item name="name" label="Нэр" rules={[{ required: true, message: 'Нийлүүлэгчийн нэрийг оруулна уу.' }]}>
                      <Input placeholder="Нийлүүлэгчийн нэр" />
                      </Form.Item>

                      <Form.Item name="location" label="Байршил" rules={[{ required: true, message: 'Нийлүүлэгчийн байршлыг оруулна уу.' }]}>
                      <Input placeholder="Нийлүүлэгчийн байршил" />
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

export default Supplier;