import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

import { useNavigate } from "react-router-dom"; // useNavigate for form submission

const Cart = () => {
  let storeContext = useContext(StoreContext);

  if (!storeContext) return;

  const { food_list, cartItems, removeFromCart, getTotalCartAmount, url } =
    storeContext;

  const navigate = useNavigate();

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-tittle">
            <p>Item</p>
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          return (
            cartItems[item._id] > 0 && (
              <>
                <div key={index} className="cart-items-tittle cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    X
                  </p>
                </div>
                <hr />
              </>
            )
          );
        })}
      </div>
      <div className="cart-botton">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Sumbit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
