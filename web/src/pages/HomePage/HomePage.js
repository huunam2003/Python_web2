import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct"
import "../HomePage/style.scss";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";


function HomePage() {
  const arr = ['TV', 'Tu lanh', 'Lap top']
  return( 
  <>
    <div className="HomePage">
      <div className="TypeProduct">
        {arr.map((item) => {
          return(
            <TypeProduct name ={item} key={item}/> 
          )
        })}
      </div>
    </div>
    <div className="body">
      <SliderComponent arrImages={[slider1, slider2]}/>
      <div className="Product_Homepage" >
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
      <div className="Wrap_See_more">
        <ButtonComponent textButton="Xem thêm" type="outline" className='See_more'/>
      </div>
    </div>
  </>
  )
}

export default HomePage;
