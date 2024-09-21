import { Table } from "antd";

 
function TableComponent(props) {
  const { selectionType = 'checkbox', data=[], columns=[] } = props;
  
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
      {...props}
    />
  );
}
 
export default TableComponent;