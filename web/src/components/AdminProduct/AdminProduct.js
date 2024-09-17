import { Button, Form, Modal } from "antd";
import {
    PlusOutlined ,
  }from '@ant-design/icons';
import "../AdminProduct/style.scss";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [stateProduct, setStateProdut] = useState({
        name: '',
        price: '',
        description: '',
        type: '',
        countInStock: '',
        image: '',
    })

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = () => {
        console.log("finished", stateProduct);
    }

    const handleOnchange = (e) => {
        setStateProdut({
            ...stateProduct, 
            [e.target.name]: e.target.value
        })  
    } 

    return ( 
        <div>
            <h3>Quản lí sản phẩm</h3>
            <Button className="btn_add" onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize:'30px'}}/></Button>
            <TableComponent/>
            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} okText=''>
            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your name!',
                        },
                    ]}
                >
                <InputComponent value = {stateProduct.name} onChange ={handleOnchange} name = 'name'/>
                </Form.Item>

                <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your type!',
                        },
                    ]}
                >
                <InputComponent value = {stateProduct.type} onChange ={handleOnchange} name = 'type'/>
                </Form.Item>

                <Form.Item
                    label="Count inStock"
                    name="countInStock"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Count inStock!',
                        },
                    ]}
                >
                <InputComponent value = {stateProduct.countInStock} onChange ={handleOnchange} name = 'countInStock'/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your price!',
                        },
                    ]}
                >
                <InputComponent value = {stateProduct.price} onChange ={handleOnchange} name = 'price'/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your description!',
                        },
                    ]}
                >
                <InputComponent value = {stateProduct.description} onChange ={handleOnchange} name = 'description'/>
                </Form.Item>
                
                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </Modal>
        </div> 
    );
}

export default AdminProduct;