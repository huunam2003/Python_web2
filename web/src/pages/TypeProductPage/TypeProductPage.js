import { Col, Row, Pagination } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import "../TypeProductPage/style.scss";

function TypeProductPage() {
    const onChange=()=> {};
    return ( 
        <div className="Container_TypeProduct">
            <div style={{width: '1400px', margin: '0 auto'}}>
                <Row className="Content_TypeProduct">
                    <Col span={4} className="Navbar_TypeProduct">
                        <NavbarComponent/>
                    </Col>
                    <Col span={20} className="Product">
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                        <Pagination defaultCurrent={2} total={100} onChange={onChange} className="Pagination-Next" />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default TypeProductPage;