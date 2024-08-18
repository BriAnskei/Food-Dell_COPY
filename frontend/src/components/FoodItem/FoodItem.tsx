import { assets } from "../../assets/assets";
import "./FoodItem.css";

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // Image path or URL
}

const FoodItem: React.FC<FoodItemProps> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />
      </div>
      <div className="food-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
