import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const menuItems = [
  { name: "Nam", path: "/products/Nam" },
  { name: "Nữ", path: "/products/Nữ" },
  { name: "Trẻ em", path: "/products/Trẻ em" },
  { name: "Phụ kiện", path: "/products/Phụ kiện" },
  { name: "Giày dép", path: "/products/Giày dép" },
  { name: "Bộ sưu tập", path: "/products/Bộ sưu tập" },
  { name: "Sale", path: "/products/Sale" },
  { name: "Xu hướng", path: "/products/Xu hướng" },
  { name: "Tin tức", path: "/products/Tin tức" },
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
