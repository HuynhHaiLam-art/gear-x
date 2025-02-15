import React from "react";
import "./Navbar.css";

const MegaMenu = () => {
  return (
    <div className="mega-menu">
      <div className="mega-column">
        <h3>Thương hiệu</h3>
        <ul>
          <li>ACER | PREDATOR</li>
          <li>ASUS | ROG Gaming</li>
          <li>MSI</li>
          <li>LENOVO</li>
          <li>GIGABYTE | AORUS</li>
          <li>HP | OMEN</li>
        </ul>
      </div>
      <div className="mega-column">
        <h3>MSI Gaming</h3>
        <ul>
          <li>Cyborg / Thin GF Series</li>
          <li>Sword / Katana Series</li>
          <li>Creator Series</li>
          <li>Crosshair | Pulse | GP Series</li>
          <li>GE Series</li>
        </ul>
      </div>
      <div className="mega-column">
        <h3>LENOVO Gaming</h3>
        <ul>
          <li>Yoga Series</li>
          <li>LOQ Series</li>
          <li>Legion</li>
        </ul>
      </div>
      <div className="mega-column">
        <h3>Handheld / Console</h3>
        <ul>
          <li>Asus</li>
          <li>Lenovo</li>
          <li>MSI</li>
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;
