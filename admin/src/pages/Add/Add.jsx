import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const res = await axios.post(`${url}/api/food/add`, formData);

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImage(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="6"
            required
          />
        </div>

        <div className="add-category-price">
          <select name="category" value={data.category} onChange={onChangeHandler}>
            <option>Salad</option>
            <option>Rolls</option>
            <option>Deserts</option>
            <option>Sandwich</option>
            <option>Cake</option>
            <option>Pure Veg</option>
            <option>Pasta</option>
            <option>Noodles</option>
          </select>

          <input
            type="number"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            placeholder="₹100"
            required
          />
        </div>

        <button className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
