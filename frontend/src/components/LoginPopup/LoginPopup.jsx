import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token); // ✅ Fixed setItem
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            type="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit" className="styled-button">
          {currState === "Sign Up" ? "Create Account" : "Login"}
          <div className="inner-button">
            <svg
              id="Arrow"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              className="icon"
            >
              <defs>
                <linearGradient
                  y2="100%"
                  x2="100%"
                  y1="0%"
                  x1="0%"
                  id="iconGradient"
                >
                  <stop
                    style={{ stopColor: "#FFFFFF", stopOpacity: 1 }}
                    offset="0%"
                  ></stop>
                  <stop
                    style={{ stopColor: "#AAAAAA", stopOpacity: 1 }}
                    offset="100%"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#iconGradient)"
                d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
              ></path>
            </svg>
          </div>
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the Terms of Use and Privacy Policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
