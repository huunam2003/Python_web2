import { Card } from "antd";
import "../CardComponent/style.scss";
import { StarFilled } from "@ant-design/icons";

function CardComponent() {
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
    >
      <div className="NameProduct">Iphone</div>
      <div className="Evaluate">
        <span style={{marginRight: '5px'}}>
          <span>4.96 </span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <span> | Đã bán 1000+</span>
      </div>

      <div className="Price_card">
        1.000.000đ
        <span className="Discount">-5%</span>
      </div>
    </Card>
  );
}

export default CardComponent;
