import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleConfirmOrder = (id) => {
    console.log(`Confirming order with id: ${id}`);
    // Logic để xác nhận đơn hàng
  };

  const handleProcessOrder = (id) => {
    console.log(`Processing order with id: ${id}`);
    // Logic để xử lý đơn hàng
  };

  useEffect(() => {
    // Mock data for demonstration
    const mockOrders = [
      { id: 1, customer: "Customer 1", date: "2024-01-01", total: 100, status: "Pending" },
      { id: 2, customer: "Customer 2", date: "2024-01-02", total: 200, status: "Shipped" },
      { id: 3, customer: "Customer 3", date: "2024-01-03", total: 300, status: "Delivered" },
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <AdminContainer>
      <div className="order-management-container">
        <div className="order-management-header">
          <h2>Order Management</h2>
          <div className="order-controls">
            <SearchBar placeholder="Search orders..." />
          </div>
        </div>
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleConfirmOrder(order.id)}>Confirm</button>
                  <button onClick={() => handleProcessOrder(order.id)}>Process</button>
                  <Link to={`/admin/orders/${order.id}`}>
                    <button>Chi tiết</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminContainer>
  );
};

export default OrderManagement;