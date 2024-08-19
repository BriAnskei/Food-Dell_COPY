import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
const Cart = () => {
  let storeContext = useContext(StoreContext);

  if (!storeContext) return;

  const { food_list, cartItems, removeFromCart } = storeContext;
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-tittle">
            <p>Item</p>
            <p>Tittle</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div key={index} className="cart-items-tittle cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p className="cross">X</p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default Cart;
