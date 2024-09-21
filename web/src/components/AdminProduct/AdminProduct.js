import { Button, Form, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../AdminProduct/style.scss";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined  } from "@ant-design/icons";

function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [IsOpenDrawer, setIsOpenDrawer] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
    countInStock: "",
    image: "",
  });
  const formData = {
    name: stateProduct.name,
    price: stateProduct.price,
    description: stateProduct.description,
    type: stateProduct.type,
    countInStock: stateProduct.countInStock,
    image: stateProduct.image
  }
  const [form] =Form.useForm();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message); // Khong dung
      }
      alert(result.message);
    } catch (error) {
      // neu khong khop
      alert(error);
      console.log(error);
    }
  };
 

  const handleSubmitUpdate = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/update/${productId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // If delete is successful, remove the deleted product from the UI
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updateing product:', error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      type: "",
      countInStock: "",
      image: "",
    });
    form.resetFields()
  };
 
  const onFinish = () => {
    console.log("finished", stateProduct);
  };
 
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
 
  const [fileList, setFileList] = useState([]);
 
  const handleOnchangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
    setFileList([file]);
  };

  const [products, setProducts] = useState([]);
  // Fetch the product list from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/filter`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, []);
  

  // Handle delete function
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${productId}`, {
        method: 'DELETE',
      });
 
      if (response.ok) {
        // If delete is successful, remove the deleted product from the UI
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        alert('Product deleted successfully!');
      } else {
        alert('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
 
  const handleUpdate = () => {
    setIsOpenDrawer(true);
  }

  // Render the delete button for each row
  const renderAction = (text, record) => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
          onClick={() => handleDelete(record.id)}
        />
        <EditOutlined
        style={{ color: '#ccc', fontSize: '20px', cursor: 'pointer' }}
        onClick={handleUpdate}
        />
      </div> 
    );
  };
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Count inStock',
      dataIndex: 'countinstock',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  const data = products?.map((product, index) => ({
    ...product,
    key: index,
    
  }));
 
 
  return (
    <div>
      <h3>Quản lí sản phẩm</h3>
      <Button className="btn_add" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined style={{ fontSize: "30px" }} />
      </Button>
      <TableComponent 
        columns={columns}
        data={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record.id)
            }
          };
        }}
      />
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
 
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your type!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.type}
              onChange={handleOnchange}
              name="type"
            />
          </Form.Item>
 
          <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your Count inStock!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnchange}
              name="countInStock"
            />
          </Form.Item>
 
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>
 
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnchange}
              name="description"
            />
          </Form.Item>
 
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
          >
            <Upload
              className="Upload_Image"
              onChange={handleOnchangeImage}
              fileList={fileList}
              maxCount={1}
            >
              <div>
                <Button>Select file</Button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <img
                  src={stateProduct.image}
                  alt=""
                  style={{ width: "150px" }}
                />
              </div>
            </Upload>
          </Form.Item>
 
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <DrawerComponent title='Sửa sản phẩm'  open={IsOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='50%'>
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
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
 
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your type!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.type}
              onChange={handleOnchange}
              name="type"
            />
          </Form.Item>
 
          <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your Count inStock!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnchange}
              name="countInStock"
            />
          </Form.Item>
 
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>
 
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnchange}
              name="description"
            />
          </Form.Item>
 
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
          >
            <Upload
              className="Upload_Image"
              onChange={handleOnchangeImage}
              fileList={fileList}
              maxCount={1}
            >
              <div>
                <Button>Select file</Button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <img
                  src={stateProduct.image}
                  alt=""
                  style={{ width: "150px" }}
                />
              </div>
            </Upload>
          </Form.Item>
 
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={() => handleSubmitUpdate(rowSelected)}>
              Submit 
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
    </div>
  );
}
 
export default AdminProduct;