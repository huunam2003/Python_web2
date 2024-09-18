import { Card } from "antd";
import "../CardComponent/style.scss";
import { useNavigate } from "react-router-dom";
function CardComponent() {
  const navigate = useNavigate()
  const handleProductDetails = () => {
    navigate('/product-detail')
  }

  return (
    <Card className="Card"
      hoverable
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://tse1.mm.bing.net/th?id=OIP.TJVtXbiOokT81I5N7FJ-cwHaEK&pid=Api"
        />
      }
      onClick={handleProductDetails}
    >
      <div className="NameProduct">Iphone</div>
      <div className="Price_card">
        1.000.000đ
      </div>
    </Card>
  );
}

export default CardComponent;
