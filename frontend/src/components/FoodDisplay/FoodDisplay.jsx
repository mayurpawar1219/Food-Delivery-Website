import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext"; 
import FoodItem from "../FoodItem/FoodItem"; // ✅ Ensure this is imported

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext); // ✅ Get food_list from context

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          console.log(category, item.category); // ✅ Log properly
          
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
          return null; // ✅ Return null for non-matching categories
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
