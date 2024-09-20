import { Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
 
function TableComponent(props) {
  const { selectionType = 'checkbox' } = props;
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
 
  // Render the delete button for each row
  const renderAction = (text, record) => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
          onClick={() => handleDelete(record.id)}
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
 
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
 
  return (
    <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
    />
  );
}
 
export default TableComponent;