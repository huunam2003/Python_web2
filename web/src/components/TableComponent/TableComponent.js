import { Table } from "antd";

function TableComponent(props) {
    const { selectionType = 'checkbox' } = props
    
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
          title: 'Count InStock',
          dataIndex: 'countInStock',
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
        },
      ];
      const data = [];
      
      // rowSelection object indicates the need for row selection
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
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