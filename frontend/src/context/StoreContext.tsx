import { createContext, ReactNode, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// Define the type of food_list (assuming it's an array of objects)
interface FoodItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface StoreContextType {
  food_list: FoodItemType[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
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

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
