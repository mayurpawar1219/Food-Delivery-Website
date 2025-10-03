import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  //const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
  
      if (response.data.success) {
        toast.success("Food removed successfully");
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error");
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <div className="list-title">All Foods List</div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs.{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
