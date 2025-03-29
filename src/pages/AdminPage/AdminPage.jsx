import React, { useState } from "react";
import {
  FiMenu,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiUserCheck,
} from "react-icons/fi";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";
import "./AdminPage.css";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AdminContainer>
      <header className="admin-header">
        <div className="header-left">
          <button className="mobile-menu">
            <FiMenu />
          </button>
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="admin-profile">
            <img src="https://traicho.com/wp-content/uploads/2024/07/cat-anh-long-ngan-1-3.jpg" alt="Admin" />
            <span>Admin User</span>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="dashboard-summary">
          <div className="summary-card bg-blue">
            <div className="card-icon">
              <FiUsers />
            </div>
            <div className="card-info">
              <h3>Total Users</h3>
              <span className="card-value">1,234</span>
              <p className="card-trend positive">+12% from last month</p>
            </div>
          </div>

          <div className="summary-card bg-green">
            <div className="card-icon">
              <FiPackage />
            </div>
            <div className="card-info">
              <h3>Total Products</h3>
              <span className="card-value">567</span>
              <p className="card-trend positive">+5% from last month</p>
            </div>
          </div>

          <div className="summary-card bg-orange">
            <div className="card-icon">
              <FiShoppingCart />
            </div>
            <div className="card-info">
              <h3>Total Orders</h3>
              <span className="card-value">89</span>
              <p className="card-trend negative">-3% from last month</p>
            </div>
          </div>

          <div className="summary-card bg-purple">
            <div className="card-icon">
              <FiDollarSign />
            </div>
            <div className="card-info">
              <h3>Total Revenue</h3>
              <span className="card-value">10.5M₫</span>
              <p className="card-trend positive">+8% from last month</p>
            </div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="chart-container">
            <h3>Monthly Revenue</h3>
            <div className="chart-placeholder">
              {/* Chart would go here - using placeholder for now */}
              <div className="mock-chart">
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '30%' }}></div>
                <div className="bar" style={{ height: '50%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '80%' }}></div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              <li>
                <div className="activity-icon"><FiUserCheck /></div>
                <div className="activity-details">
                  <p>New user registered</p>
                  <span className="time">5 minutes ago</span>
                </div>
              </li>
              <li>
                <div className="activity-icon"><FiShoppingCart /></div>
                <div className="activity-details">
                  <p>New order placed</p>
                  <span className="time">1 hour ago</span>
                </div>
              </li>
              <li>
                <div className="activity-icon"><FiPackage /></div>
                <div className="activity-details">
                  <p>Product stock updated</p>
                  <span className="time">3 hours ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="admin-footer">
        <p>© 2025 Gear X Admin. All rights reserved.</p>
        <div>Version 1.0.0</div>
      </footer>
    </AdminContainer>
  );
};

export default AdminPage;