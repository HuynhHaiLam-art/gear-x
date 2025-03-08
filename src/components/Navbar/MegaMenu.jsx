import React from "react";
import "./MegaMenu.css";

const MegaMenu = ({ category }) => {
  const menuData = {
    Nam: ["Áo thun", "Áo sơ mi", "Áo khoác", "Quần jeans", "Quần short", "Phụ kiện"],
    Nữ: ["Váy", "Áo kiểu", "Áo khoác", "Quần legging", "Quần jeans", "Túi xách"],
    "Trẻ em": ["Áo thun", "Áo khoác", "Quần bò", "Váy", "Bộ đồ", "Giày dép"],
  };

  return (
    <div className="mega-menu">
      <div className="mega-column">
        <h3>{category}</h3>
        <ul>
          {menuData[category]?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;
