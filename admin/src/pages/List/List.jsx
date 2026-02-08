import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      }
    } catch {
      toast.error("Failed to load food list");
    }
  };

  const removeFood = async (id) => {
    try {
      const res = await axios.post(`${url}/api/food/remove`, { id });
      if (res.data.success) {
        toast.success("Food removed");
        fetchList();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h3>All Foods</h3>

      {list.map((item) => (
        <div className="list-table-format" key={item._id}>
          <img src={`${url}/uploads/${item.image}`} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>₹{item.price}</p>
          <p className="cursor" onClick={() => removeFood(item._id)}>
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
