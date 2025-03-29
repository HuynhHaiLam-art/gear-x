import React, { useState, useEffect } from "react";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingOrder, setViewingOrder] = useState(null);

  useEffect(() => {
    // Mock data for demonstration with additional status flags
    const mockOrders = [
      { id: 1, customer: "John Doe", total: 120.5, status: "Pending", date: "2025-03-25", canProcess: true, canShip: true, canDeliver: false, canCancel: true, canRefund: false },
      { id: 2, customer: "Jane Smith", total: 75.0, status: "Shipped", date: "2025-03-24", canProcess: false, canShip: true, canDeliver: false, canCancel: false, canRefund: false },
      { id: 3, customer: "Alice Johnson", total: 200.0, status: "Delivered", date: "2025-03-23", canProcess: false, canShip: false, canDeliver: true, canCancel: false, canRefund: true }
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const handleViewOrder = (order) => {
    setViewingOrder(order);
  };

  const handleCloseView = () => {
    setViewingOrder(null);
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="order-management-container">
      <header className="order-management-header">
        <h1>Order Management</h1>
      </header>
      <main className="order-management-main">
        {viewingOrder ? (
          <div className="view-order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {viewingOrder.id}</p>
            <p><strong>Customer:</strong> {viewingOrder.customer}</p>
            <p><strong>Total:</strong> ${viewingOrder.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {viewingOrder.status}</p>
            <p><strong>Date:</strong> {viewingOrder.date}</p>
            <div className="order-progress">
              <div className={`progress-step ${viewingOrder.canProcess ? "active" : ""}`}>
                <span className="step-icon">🛠️</span>
                <span className="step-label">Process</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${viewingOrder.canShip ? "active" : ""}`}>
                <span className="step-icon">🚚</span>
                <span className="step-label">Ship</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${viewingOrder.canDeliver ? "active" : ""}`}>
                <span className="step-icon">📦</span>
                <span className="step-label">Deliver</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${viewingOrder.canCancel ? "active" : ""}`}>
                <span className="step-icon">❌</span>
                <span className="step-label">Cancel</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${viewingOrder.canRefund ? "active" : ""}`}>
                <span className="step-icon">💰</span>
                <span className="step-label">Refund</span>
              </div>
            </div>
            <button onClick={handleCloseView}>Close</button>
          </div>
        ) : (
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>{order.date}</td>
                    <td>
                      <button onClick={() => handleViewOrder(order)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderManagement;