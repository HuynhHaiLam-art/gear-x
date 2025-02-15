import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import "./Navbar.css";

const menuItems = [
  { name: "Laptop", submenu: true },
  { name: "Xgear PC", submenu: false },
  { name: "Màn hình", submenu: false },
  { name: "Linh Kiện", submenu: false },
  { name: "Gaming Gear", submenu: false },
  { name: "Phụ kiện", submenu: false },
  { name: "Tự chọn cấu hình", submenu: false },
  { name: "Phần mềm", submenu: false },
  { name: "Best seller", submenu: false },
  { name: "Tin công nghệ", submenu: false },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="nav-item"
            onMouseEnter={() => item.submenu && setActiveMenu(item.name)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {item.name}
            {item.submenu && activeMenu === item.name && <MegaMenu />}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
