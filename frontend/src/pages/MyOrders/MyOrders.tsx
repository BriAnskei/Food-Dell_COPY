import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext, FoodItemType } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

interface OrderTypes {
  userId: string;
  items: Food[]; // Needs further definition based on your item schema structure
  amount: number;
  address: object;
  status: "Food Processing" | "In Delivery" | "Delivered" | string; // Adjust status options as needed
  date: Date;
  payment: boolean;
}
interface Food {
  __v: number;
  _id: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const MyOrders = () => {
  const context = useContext(StoreContext);
  if (!context) {
    return <div>Context not available</div>;
  }
  const [data, setData] = useState<OrderTypes[]>([]);

  const { url, token } = context;

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );

    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="myorders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                {order.status}
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
