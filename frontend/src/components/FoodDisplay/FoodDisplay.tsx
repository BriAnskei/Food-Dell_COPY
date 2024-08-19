import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

interface FoodDisplayProp {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProp> = ({ category }) => {
  const storeContext = useContext(StoreContext);

  // Ensure context is not undefined before accessing its properties
  if (!storeContext) {
    return <div>Error: Store context is not available</div>;
  }

  const { food_list } = storeContext;

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
