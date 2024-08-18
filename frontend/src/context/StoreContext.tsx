import { createContext, ReactNode } from "react";
import { food_list } from "../assets/assets";

// Define the type of food_list (assuming it's an array of objects)
interface FoodItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface StoreContextType {
  food_list: FoodItemType[];
  // other properties...
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = (props) => {
  const contextValue: StoreContextType = {
    food_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
