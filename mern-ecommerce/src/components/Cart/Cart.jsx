import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Cart.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import { addToCartItem, removeAddToCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import UserOptions from "../UserOptions/UserOptions";
const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  //increase___quantity
  const increaseQuantity = (id, quantity) => {
    const newQty = quantity + 1;
    // if (stock <= quantity) {
    //   return;
    // }
    dispatch(addToCartItem(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCartItem(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeAddToCart(id));
  };
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <div className="cart">
        <Navbar />
        {isAuthenticated && <UserOptions user={user} />}

        <>
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <div className="cart-text" data-aos="fade-right">
                <h1>Shopping Cart</h1>
                <p>Lets checkout your products</p>
                <div className="w-100 mt-3" style={{ padding: "0 20px" }}>
                  <Link to="/products">
                    <button>Explore More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      {cartItems === 0 ? (
        <div className="empty_cart" data-aos="fade-right">
          <span>
            <RemoveShoppingCartIcon />
          </span>
          <h1>No product in your cart</h1>
          <Link to="/products">
            <button>View product</button>
          </Link>
        </div>
      ) : (
        <div className="cart-section p-5">
          <div className="text-center" data-aos="fade-right">
            <p>HOME / SHOPPING CART</p>
            <h1>Shopping Cart</h1>
          </div>
          <div className="product-sending-parent-section">
            {cartItems.map((data) => (
              <>
                <div
                  className="user-cart"
                  key={data.product}
                  data-aos="fade-up"
                >
                  <span onClick={() => deleteCartItem(data.product)}>
                    <DeleteOutlineOutlinedIcon />
                  </span>
                  <img src={data.image} alt="" />
                  <h6>{data.name}</h6>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        decreaseQuantity(data.product, data.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="text" value={data.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(data.product, data.quantity)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>${data.price * data.quantity}</p>
                </div>
              </>
            ))}
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-4">
                <div className="cart-price" data-aos="fade-right">
                  <h5>Total Amount</h5>
                  <h5>
                    $
                    {cartItems.reduce(
                      (acc, data) => acc + data.quantity * data.price,
                      0
                    )}
                  </h5>
                </div>
                <div className="checkout" data-aos="fade-right">
                  <button onClick={checkoutHandler}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
