import { Col, Image, InputNumber, Row } from "antd";
import imageProduct from '../../assets/images/image1.webp';
import imageProductSmall from '../../assets/images/imagesmall.webp';
import "../ProductDetailComponent/style.scss";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function ProductDetailComponent() {
    const onChange=() => {};
    return ( 
        <Row style={{padding:'16px', background:'#fff', borderRadius: '4px'}}>
            <Col style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}} span={10}>
                <Image className="ImageLarge" src = {imageProduct} alt= "image product" preview = {false}/>
                <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
                    <Col className="Wrap_ImageSmall" span={4}>
                        <Image className="ImageSmall" src = {imageProductSmall} alt= "image product" preview = {false}/>
                    </Col>
                    <Col className="Wrap_ImageSmall" span={4}>
                        <Image className="ImageSmall" src = {imageProductSmall} alt= "image product" preview = {false}/>
                    </Col>
                    <Col className="Wrap_ImageSmall" span={4}>
                        <Image className="ImageSmall" src = {imageProductSmall} alt= "image product" preview = {false}/>
                    </Col>
                    <Col className="Wrap_ImageSmall" span={4}>
                        <Image className="ImageSmall" src = {imageProductSmall} alt= "image product" preview = {false}/>
                    </Col>
                    <Col className="Wrap_ImageSmall" span={4}>
                        <Image className="ImageSmall" src = {imageProductSmall} alt= "image product" preview = {false}/>
                    </Col>
                    <Col className="Wrap_ImageSmall" span={4}>
                        <Image className="ImageSmall" src = {imageProductSmall} alt= "image product" preview = {false}/>
                    </Col>
                </Row>
            </Col>
            <Col style={{padding:'10px'}} span={14}>
                <div className="Name_ProducDetail">
                    Apple iPhone 15 Pro Max
                </div>
                <div style={{padding:'15px 0 10px 0'}}>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }}/>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }}/>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }}/>
                    <span> | Đã bán 1000+</span>
                </div>
                <div className="Wrap_Price_ProductDetail">
                    <div className="Price_ProductDetail">20.000.000đ</div>
                </div>
                <div className="AddressProduct">
                    <span>Giao đến</span>
                    <span className="address">Hà Nội</span>
                    <span className="change_address">Đổi địa chỉ</span>
                </div>
                <div className="Wrap_QualityProduct">
                    <div>Số lượng</div>
                    <div className="QualityProduct">
                        <button className="Btn_QualityProduct">                        
                            <MinusOutlined style={{color:'#000', fontSize:'15px'}}/>
                        </button>

                        <InputNumber className="Input_ProductDetail" defaultValue={3} onChange={onChange} size="small" />

                        <button className="Btn_QualityProduct">
                            <PlusOutlined style={{color:'#000', fontSize:'15px'}}/>
                        </button>
                    </div>
                </div>
                <div className="Wrap_Btn_Pay">
                    <ButtonComponent className='Btn_Buy'    
                        bordered ="false" 
                        textButton={'Thêm vào giỏ hàng'}
                    />
                </div>
            </Col>
        </Row> 
    );
}

export default ProductDetailComponent;