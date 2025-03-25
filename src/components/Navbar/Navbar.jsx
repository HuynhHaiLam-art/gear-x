import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const menuItems = [
  { name: "Tất cả sản phẩm", path: "/products/all" },
  { name: "Nam", path: "/products/1" },
  { name: "Nữ", path: "/products/2" },
  { name: "Trẻ em", path: "/products/3" },
  { name: "Sale", path: "/products/4" },
  { name: "Xu hướng", path: "/products/5" },
  { name: "Bộ sưu tập", path: "/products/6" },
];

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.path} className="nav-link">{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
