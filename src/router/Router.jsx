import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Store from "../pages/shop/Store";
import Cards from "../components/Cards";
import StoreItems from "../pages/shop/StoreItems";
import Signup from "../components/Signup";
import PrivateRouter from "../privaterouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashBoardLayout from "../layout/DashBoardLayout";
import DashBoard from "../pages/dashboard/admin/DashBoard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import AddProduct from "../pages/dashboard/admin/AddProduct";
import ManageProduct from "../pages/dashboard/admin/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";
import PaymentSuccess from "../pages/shop/PaymentSuccess";
import PaymentFailure from "../pages/shop/PaymentFailure";
import PageNotFound from "../components/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/stores",
        element: <Store />,
      },
      {
        path: "/stores/:id",
        element: <StoreItems />,
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/failure",
        element: <PaymentFailure />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          fetch(`https://mega-mart-server.onrender.com/products/${params.id}`),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
