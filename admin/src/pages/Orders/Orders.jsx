import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(`${url}/api/order/list`);
    if (res.data.success) {
      setOrders(res.data.data);
    }
  };

  const statusHandler = async (e, id) => {
    await axios.post(`${url}/api/order/status`, {
      orderId: id,
      status: e.target.value,
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Orders</h3>

      {orders.map((order) => (
        <div className="order-item" key={order._id}>
          <img src={assets.parcel_icon} alt="" />

          <div>
            <p>
              {order.items.map(
                (i, idx) =>
                  `${i.name} x ${i.quantity}${
                    idx !== order.items.length - 1 ? ", " : ""
                  }`
              )}
            </p>

            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.city}</p>
            <p>{order.address.phone}</p>
          </div>

          <p>₹{order.amount}</p>

          <select
            value={order.status}
            onChange={(e) => statusHandler(e, order._id)}
          >
            <option>Food Processing</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
