import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import "../ProductDetailPage/style.scss";

function ProductDetailPage() {
    return ( 
        <div className="Wrap_ProductDetail">
            <h5>Trang chủ</h5> 
            <ProductDetailComponent/>
        </div>
    );
}

export default ProductDetailPage;