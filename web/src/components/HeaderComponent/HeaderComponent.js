import { Badge, Col, Row } from "antd";
import "../HeaderComponent/style.scss";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  // CaretDownOutlined,
  ShoppingCartOutlined,
}from '@ant-design/icons';
function HeaderComponent() {
  const navigate = useNavigate() 
  let output = "Đăng nhập/Đăng ký"
  if(localStorage.getItem("status") == 1){
    output = localStorage.getItem("email")
  }
  const handleNavigateHome = () => {
    navigate('/')
  }
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleLogout = () =>{
    
    localStorage.setItem("status" , 0)
    navigate("/")
  }
  const handleNavigateCart = () => {
    navigate('/order')
  }
  return (
    <div>
      <Row className="WrapperHeader">
        <Col className="TextHeader" span={5} onClick={handleNavigateHome}>
          Dell
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
              <span className="User_Text" onClick={handleNavigateLogin}>{output}</span>
              {/* <div>
                <span className="User_Text">Tài khoản</span>
                <CaretDownOutlined />
              </div> */}
              <span className="uu" onClick={handleLogout}>Dang xuat</span>

            </div>
          </div>

          <div>
              <Badge count ={4} size="small">
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
