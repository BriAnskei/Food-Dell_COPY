import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink className="sidebar-option" to={"/add"}>
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink className="sidebar-option" to={"/list"}>
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink className="sidebar-option" to={"/orders"}>
          <img src={assets.order_icon} alt="" />
          <p>Orders Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
