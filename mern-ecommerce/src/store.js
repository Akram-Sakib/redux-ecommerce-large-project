import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productsReducer,
  productDeleteReducer,
  getAllReviewReducer,
  deleteReviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  UserDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrderReducer,
  myOrderDetailsReducer,
  myOrderReducer,
  newOrderReducer,
  OrderReducerManagement,
} from "./reducers/orderReducer";
import {
  newREviewReducer,
  reviewAllReducer,
  reviewReducerManagement,
} from "./reducers/reviewReducer";
import {
  newSubscribeReducer,
  subscribeAllReducer,
} from "./reducers/subscribeReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: myOrderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productDeleteReducer,
  allOrders: allOrderReducer,
  order: OrderReducerManagement,
  allUsers: allUsersReducer,
  userDetails: UserDetailsReducer,
  productReview: getAllReviewReducer,
  review: deleteReviewReducer,
  webReview: newREviewReducer,
  peopleReview: reviewAllReducer,
  deleteReview: reviewReducerManagement,
  subscribe: newSubscribeReducer,
  getSubscribe: subscribeAllReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
