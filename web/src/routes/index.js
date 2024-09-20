import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import AdminPage from "../pages/AdminPage/AdminPage";
export const routes = [
  {
    path: "/",
    component: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    component: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/product/:column/:type",
    component: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    component: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    component: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/product-detail/:id",
    component: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
  {
    path: "/admin",
    component: AdminPage,
  },
];
