import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiDollarSign,
  FiUserCheck,
  FiTrendingUp,
  FiShoppingCart,
} from "react-icons/fi";
import "./AdminContainer.css";

const AdminContainer = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-container">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Gear X</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin" className="active">
                <FiBarChart2 className="nav-icon" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <FiUsers className="nav-icon" />
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <FiPackage className="nav-icon" />
                <span className="nav-text">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <FiShoppingCart className="nav-icon" />
                <span className="nav-text">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/categories">
                <FiTrendingUp className="nav-icon" />
                <span className="nav-text">Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings">
                <FiSettings className="nav-icon" />
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminContainer;