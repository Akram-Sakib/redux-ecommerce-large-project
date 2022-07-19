import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeManagement from "./components/Homemanagement";
import SingleProductDetails from "./SingleProductDetails/SingleProductDetails";
import ProductShowWithCategories from "./ProductShowWithCategories/ProductShowWithCategories";
import Search from "./Search/Search";
import NoMatch from "./components/NoMatch/NoMatch";
import LoginAndSignUp from "./components/User/LoginAndSignUp";
import { useEffect, useState } from "react";
import store from "./store";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/UpdateUser/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPasswordAuthentication from "./components/ForgotPasswordAuthentication/ForgotPasswordAuthentication";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { loadUser } from "./actions/userAction";
import Success from "./components/Success/Success";
import Order from "./components/Order/Order";
import MyOrderDetails from "./components/MyOrderDetails/MyOrderDetails";
import Setting from "./components/Setting/Setting";
import ViewManagement from "./components/Dashboard/ViewManagement/ViewManagement";
import ShowProductsByAdmin from "./components/ShowProductsByAdmin/ShowProductsByAdmin";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import AllOrders from "./components/AllOrders/AllOrders";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import Users from "./components/Users/Users";
import UpdateUserManagement from "./components/UpdateUserManagement/UpdateUserManagement";
import GetProductsReview from "./components/GetProductsReview/GetProductsReview";
import WebManage from "./components/WebManage/WebManage";
import ServiceManagement from "./components/ServiceManagement/ServiceManagement";
import ContactManagement from "./components/ContactManagement/ContactManagement";
import AboutManagementAboutManagement from "./components/AboutManagement/AboutManagementAboutManagement";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ClockLoader } from "react-spinners";
function App() {
  // const Elements = useElements();
  // console.log("Elements", Elements);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
  }

  //
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            {loading ? (
              <div className="loader-item">
                <ClockLoader color={"black"} loading={loading} size={150} />
                <h1>please wait </h1>
              </div>
            ) : (
              <HomeManagement />
            )}
          </Route>
          <Route path="/services">
            <ServiceManagement />
          </Route>
          <Route path="/contact">
            <ContactManagement />
          </Route>
          <Route path="/about">
            <AboutManagementAboutManagement />
          </Route>
          <Route path="/product/:id" component={SingleProductDetails} />
          <Route exact path="/products" component={ProductShowWithCategories} />
          <ProtectedRoute path="/me/update" component={UpdateProfile} />
          <ProtectedRoute path="/password/update" component={UpdatePassword} />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute path="/success" component={Success} />
          <ProtectedRoute path="/orders" component={Order} />
          <ProtectedRoute path="/order/:id" component={MyOrderDetails} />
          <ProtectedRoute path="/account" component={Setting} />
          <ProtectedRoute
            path="/admin/products"
            component={ShowProductsByAdmin}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/dashboard"
            component={ViewManagement}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/product/:id"
            component={UpdateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/create-product"
            component={CreateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/orders"
            component={AllOrders}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/reviews"
            component={GetProductsReview}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/webReviews"
            component={WebManage}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/order/:id"
            component={OrderStatus}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/users"
            component={Users}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/update-user/:id"
            component={UpdateUserManagement}
          />

          <ProtectedRoute exact path="/process/payment">
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />{" "}
            </Elements>
          </ProtectedRoute>

          <Route
            path="/password/forgot"
            component={ForgotPasswordAuthentication}
          />
          <Route path="/Cart" component={Cart} />
          <Route path="/password/reset/:token" component={ResetPassword} />
          <Route
            path="/products/:keyword"
            component={ProductShowWithCategories}
          />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/login" component={LoginAndSignUp} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
// "proxy": "http://192.168.0.107:5000"
// "proxy": "http://192.168.1.10:5000"
// mongodb+srv://rsm-ecommerce:2UfZByQIHUdNXrRI@cluster0.enpeg.mongodb.net/ecommerce?retryWrites=true&w=majority
export default App;
