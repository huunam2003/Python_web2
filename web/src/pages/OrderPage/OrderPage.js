import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "../OrderPage/style.scss";
import { InputNumber } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCart } from "../../components/CartContext/CartContext";

function OrderPage({ count = 1 }) {
  const { cartItems } = useCart(); // Lấy dữ liệu giỏ hàng từ context
  const [numProduct, setNumProduct] = useState(1);

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else if (type === "decrease" && numProduct > 1) {
      setNumProduct(numProduct - 1);
    }
  };

  return (
    <div className="cart_container">
      <div className="cart_table">
        <div className="cart_header">
          <span style={{ flex: 2 }}>Tất cả ({cartItems.length} sản phẩm)</span>
          <span style={{ flex: 1 }}>Đơn giá</span>
          <span style={{ flex: 1 }}>Số lượng</span>
          <span style={{ flex: 1 }}>Thành tiền</span>
          <DeleteOutlined />
        </div>

        {/* Hiển thị danh sách sản phẩm trong giỏ hàng */}
        {cartItems.map((item) => (
          <div key={item.id} className="cart_item">
            <div className="cart_item_img">
              <img src={item.image} alt={item.name} width={50} />
            </div>
            <div className="cart_item_name">{item.name}</div>
            <div className="cart_item_price">
              <span>{item.price.toLocaleString()} đ</span>
            </div>
            <div className="cart_item_quantity">
              <button
                className="Btn_QualityProduct_OrderPage"
                onClick={() => handleChangeCount("decrease")}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "10px" }} />
              </button>

              <InputNumber
                className="Input_OrderPage"
                defaultValue={item.quantity}
                onChange={onChange}
                value={numProduct}
                size="small"
              />

              <button
                className="Btn_QualityProduct_OrderPage"
                onClick={() => handleChangeCount("increase")}
              >
                <PlusOutlined style={{ color: "#000", fontSize: "10px" }} />
              </button>
            </div>
            <div className="cart_item_total">
              {(item.price * item.quantity).toLocaleString()} đ
            </div>
            <div className="cart_item_delete">
              <DeleteOutlined />
            </div>
          </div>
        ))}
      </div>

      {/* Tổng kết giỏ hàng */}
      <div className="cart_summary">
        <div className="cart_summary_total">
          <span>Tổng tiền</span>{" "}
          <span className="cart_summary_total_amount">
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()} đ
          </span>
        </div>
        <div style={{ marginTop: "10px" }}>
          <ButtonComponent
            className="Btn_Pay"
            bordered="false"
            textButton={"Mua hàng"}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
