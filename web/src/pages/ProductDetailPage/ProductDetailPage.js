import { useParams } from "react-router-dom";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import "../ProductDetailPage/style.scss";

function ProductDetailPage() {
    const {id} = useParams()
    return ( 
        <div className="Wrap_ProductDetail">
            <ProductDetailComponent idProduct = {id}/>
        </div>
    );
}

export default ProductDetailPage;
