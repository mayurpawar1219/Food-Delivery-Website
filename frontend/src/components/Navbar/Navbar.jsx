import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/zomato-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, menuItems } = useContext(StoreContext); // Get menu items from context
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredResults = menuItems.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img
          src={logo}
          alt="Zomato Logo"
          className="logo"
          style={{ width: "120px", height: "auto" }}
        />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#footer_dev"
          className={menu === "mobile-app" ? "active" : ""}
          onClick={() => setMenu("mobile-app")}
        >
          Mobile-App
        </a>
        <a
          href="#footer_dev"
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        {/* Search Icon Clickable */}
        <div className="search-container">
          <img
            src={assets.search_icon}
            alt="search"
            onClick={() => setShowSearch(!showSearch)}
            style={{ cursor: "pointer" }}
          />
          {showSearch && (
            <div className="search-dropdown">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
              <ul className="search-results">
                {searchResults.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => navigate(`/menu/${item.id}`)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button className="button" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
