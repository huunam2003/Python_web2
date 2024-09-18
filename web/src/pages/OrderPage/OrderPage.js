import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "../OrderPage/style.scss";
import {InputNumber} from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined
}from '@ant-design/icons';
function OrderPage({count = 1}) {
  const onChange = (e) => {};
  return (
   <div className="cart_container">
      <div className="cart_table">
        <div className="cart_header">
          <span style={{flex:2}}> Tất cả ({count} sản phẩm)</span>
          <span style={{flex:1}}>Đơn giá</span>
          <span style={{flex:1}}>Số lượng</span>
          <span style={{flex:1}}>Thành tiền</span>
          <DeleteOutlined/>
        </div>
        <div className="cart_item">
          <div className="cart_item_img">
            <img src="https://via.placeholder.com/50" alt="Product" />
          </div>
          <div className="cart_item_name">name sản phẩm</div>
          <div className="cart_item_price">
            <span>10.000.000</span>  
          </div>
          <div className="cart_item_quantity">
            <button className="Btn_QualityProduct_OrderPage">                        
              <MinusOutlined style={{color:'#000', fontSize:'10px'}}/>
            </button> 
            
            <InputNumber className="Input_OrderPage" defaultValue={3} onChange={onChange} size="small" />

            <button className="Btn_QualityProduct_OrderPage">
              <PlusOutlined style={{color:'#000', fontSize:'10px'}}/>
            </button>
                    
          </div>
          <div className="cart_item_total">10.000.000</div>
          <div className="cart_item_delete">
            <DeleteOutlined/>
          </div>
        </div>
      </div>
      <div className="cart_summary">
        <div className="cart_summary_item">
          <span>Tạm tính</span> 
          <span>0</span>
        </div>
        <div className="cart_summary_total">
          <span>Tổng tiền</span> <span className="cart_summary_total_amount">0213</span>
        </div>
        <div style={{ marginTop:'10px'}}>
          <ButtonComponent className='Btn_Pay'    
                         bordered ="false" 
                         textButton={'Mua hàng'}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
