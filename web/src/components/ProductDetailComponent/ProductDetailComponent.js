import { Col, Image, InputNumber, Row } from "antd";
import "../ProductDetailComponent/style.scss";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
function ProductDetailComponent({idProduct}) {

    const { addToCart } = useCart(); // Sử dụng addToCart từ context

    const handleAddOrderProduct = () => {
        const product = {
            id: idProduct,
            name: products[0]?.name,
            price: products[0]?.price,
            quantity: numProduct,
            image: products[0]?.image
        };
        addToCart(product); // Thêm sản phẩm vào giỏ hàng
    };

    const [products, setproducts] = useState([]);
    //  const response = await fetch(`http://localhost:5000/admin/${filename}`); // ${filename}
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/getid/${idProduct}`); // ${filename}
          const data = await response.json();
          // console.log(data)
          setproducts(data); // Assuming data.image contains the base64 string
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchData();
    }, [idProduct]);


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

    return ( 
        <Row style={{padding:'16px', background:'#fff', borderRadius: '4px'}}>
            <Col style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}} span={10}>
                <Image className="ImageLarge" src = {products[0]?.image} alt= "image product" preview = {false}/>
            </Col>
            <Col style={{padding:'10px'}} span={14}>
                <div className="Name_ProducDetail">
                    {products[0]?.name}
                </div>
                <div className="Wrap_Price_ProductDetail">
                    <div className="Price_ProductDetail">{products[0]?.price.toLocaleString()}</div>
                </div>
                <div className="Wrap_Description_ProductDetail">
                    <div className="Description_ProductDetail">Mô tả sản phẩm:</div>
                    <div>{products[0]?.description}</div>
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