import { Card } from "antd";
import "../CardComponent/style.scss";
import { useNavigate } from "react-router-dom";
function CardComponent(props) {
  const {name, price, image, id}=props;
  const navigate = useNavigate()
  const handleProductDetails = (id) => {
    navigate(`/product-detail/${id}`)
  }

  return (
    <Card className="Card"
      hoverable
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src={image}
        />
      }
      onClick={() => handleProductDetails(id)}
    >
      <div className="NameProduct">{name}</div>
      <div className="Price_card">{price.toLocaleString()}</div>
    </Card>
  );
}

export default CardComponent;
