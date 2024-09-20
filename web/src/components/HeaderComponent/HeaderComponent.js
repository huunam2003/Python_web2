import { Badge, Col, Popover, Row } from "antd";
import "../HeaderComponent/style.scss";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  // CaretDownOutlined,
  ShoppingCartOutlined,
}from '@ant-design/icons';
import { useState } from "react";
import { useCart } from "../CartContext/CartContext";

function HeaderComponent() {
  const { cartCount } = useCart();

  const navigate = useNavigate() 
  const handleNavigateHome = () => {
    navigate('/')
  }
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleNavigateCart = () => {
    navigate('/order')
  }

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("status") == 1);

  const handleLogout = () => {
    // Logic xử lý đăng xuất
    localStorage.removeItem("status"); // Xóa trạng thái đăng nhập
    localStorage.removeItem("email"); // Xóa email (nếu cần)
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
  };

  const content = (
    <div className="Logout" onClick={handleLogout}>Đăng xuất</div>
  );

  return (
    <div>
      <Row className="WrapperHeader">
        <Col className="TextHeader" span={5} onClick={handleNavigateHome}>
          LAPTOP
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size = 'large'
            placeholder = 'Search' 
            textButton = 'Tìm kiếm'

          />
        </Col>
        <Col span={6} style={{display: 'flex', gap: '54px', alignItems: 'center'}}>
          <div className="HeaderAccount">
            <UserOutlined className="User_Icon"/>
            <div >
              <span className="User_Text" >
                {isLoggedIn ? (
                  <>
                      <Popover content={content} trigger="click">
                        {localStorage.getItem("email")}
                      </Popover>
                  </>) 
                    : <div onClick={handleNavigateLogin}>Đăng nhập/Đăng ký</div>}
              </span>
            </div>
          </div>

          <div>
              <Badge count={cartCount} size="small">
                <ShoppingCartOutlined onClick={handleNavigateCart} style={{fontSize: '30px', color: '#fff'}}/>
              </Badge>
              <span className="User_Text" onClick={handleNavigateCart}>Giỏ hàng</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderComponent;
