import { Col, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import "../TypeProductPage/style.scss";
import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useParams } from "react-router-dom";

function TypeProductPage() {
    const { type } = useParams();

  const [visibleCount, setVisibleCount] = useState(10);
 
  const [products, setproducts] = useState([]);
  //  const response = await fetch(`http://localhost:5000/admin/${filename}`); // ${filename}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/type/${type}`); // ${filename}
        const data = await response.json();
        // console.log(data)
        setproducts(data); // Assuming data.image contains the base64 string
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [type]);


  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Tăng số sản phẩm hiển thị
  };

  console.log(products);
  return (
    <div className="Container_TypeProduct">
      <div style={{ width: "1400px", margin: "0 auto" }}>
        <Row className="Content_TypeProduct">
          <Col span={4} className="Navbar_TypeProduct">
            <NavbarComponent />
          </Col>
          <Col span={20} className="Product">
            {products.slice(0, visibleCount).map((product) => {
                return (
                    <CardComponent
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    id={product.id}
                    />
                );
                })}
            <div className="Wrap_See_more">
              <ButtonComponent
                textButton="Xem thêm"
                type="outline"
                className="See_more"
                onClick={handleSeeMore}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default TypeProductPage;
