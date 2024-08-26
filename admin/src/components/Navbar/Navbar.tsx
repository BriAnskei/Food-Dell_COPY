import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navber = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <img src={assets.profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navber;
