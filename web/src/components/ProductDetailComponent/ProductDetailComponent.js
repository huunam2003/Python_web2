import { Col, Image, InputNumber, Row } from "antd";
import imageProduct from '../../assets/images/image1.webp';
import "../ProductDetailComponent/style.scss";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";

function ProductDetailComponent() {
    const [numProduct, setNumProduct] = useState(1);
    const onChange=(value) => {
        setNumProduct(Number(value))
    };

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1);
        } else if (type === 'decrease' && numProduct > 1) {
            setNumProduct(numProduct - 1);
        }
    }

    const handleAddOrderProduct= () => {
    }
    return ( 
        <Row style={{padding:'16px', background:'#fff', borderRadius: '4px'}}>
            <Col style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}} span={10}>
                <Image className="ImageLarge" src = {imageProduct} alt= "image product" preview = {false}/>
            </Col>
            <Col style={{padding:'10px'}} span={14}>
                <div className="Name_ProducDetail">
                    Apple iPhone 15 Pro Max
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
                            <MinusOutlined style={{color:'#000', fontSize:'15px'}} onClick={() => handleChangeCount('decrease')}/>
                        </button>

                        <InputNumber className="Input_ProductDetail" defaultValue={1} onChange={onChange} value={numProduct} size="small" />

                        <button className="Btn_QualityProduct">
                            <PlusOutlined style={{color:'#000', fontSize:'15px'}} onClick={() => handleChangeCount('increase')}/>
                        </button>
                    </div>
                </div>
                <div className="Wrap_Btn_Pay">
                    <ButtonComponent className='Btn_Buy'    
                        bordered ="false" 
                        textButton={'Thêm vào giỏ hàng'}
                        onClick={handleAddOrderProduct}
                    />
                </div>
            </Col>
        </Row> 
    );
}

export default ProductDetailComponent;