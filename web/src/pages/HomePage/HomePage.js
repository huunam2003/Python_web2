import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import "../HomePage/style.scss";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useEffect, useState } from "react";
function HomePage() {

  const arr = ["DELL", "LENOVO", "MSI"];

  const [visibleCount, setVisibleCount] = useState(6);

  const [products, setproducts] = useState([]);
  //  const response = await fetch(`http://localhost:5000/admin/${filename}`); // ${filename}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/filter`); // ${filename}
        const data = await response.json();
        // console.log(data)
        setproducts(data); // Assuming data.image contains the base64 string
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 6); // Tăng số sản phẩm hiển thị
  };

  return (
    <>
      <div className="HomePage">
        <div className="TypeProduct">
          {arr.map((item) => {
            return <TypeProduct name={item} column = 'type' key={item} />;
          })}
        </div>
      </div>

      <div className="body">
        <SliderComponent arrImages={[slider1, slider2]} />
        <div className="Product_Homepage">
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
        </div>
        <div className="Wrap_See_more">
          <ButtonComponent
            textButton="Xem thêm"
            type="outline"
            className="See_more"
            onClick={handleSeeMore}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
