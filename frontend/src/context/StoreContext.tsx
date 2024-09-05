import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the type of food_list (assuming it's an array of objects)
export interface FoodItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface StoreContextType {
  food_list: FoodItemType[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  getTotalCartAmount: () => any; // return interface
  url: string;
  setToken: (prev: string) => void;
  token: string;
}
interface StoreContextProviderProps {
  children: ReactNode;
}

interface CartItems {
  [key: string]: number;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

const StoreContextProvider: React.FC<StoreContextProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState<FoodItemType[]>([]);

  const addToCart = async (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (token) {
      await axios.post(
        // API Db
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      // API Db
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let ItemInfo = food_list.find((product) => product._id === item);
        if (!ItemInfo) return;
        totalAmount += ItemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    // Call api
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token: string) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );

    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      // User logged in token
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); // Use the token from local storage
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
