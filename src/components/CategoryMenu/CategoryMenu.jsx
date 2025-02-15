import React from "react";
import "./CategoryMenu.css";
import cate1 from "../../assets/images/cate1.webp"
import cate2 from "../../assets/images/cate2.webp"
import cate3 from "../../assets/images/cate3.webp"
import cate4 from "../../assets/images/cate4.webp"
import cate5 from "../../assets/images/cate5.webp"
import cate6 from "../../assets/images/cate6.webp"
import cate7 from "../../assets/images/cate7.webp"
import cate8 from "../../assets/images/cate8.webp"

// Danh sách danh mục sản phẩm
const categories = [
  { name: "Laptop", image: cate1 },
  { name: "PC", image: cate2 },
  { name: "Màn hình", image: cate3 },
  { name: "Linh kiện", image: cate4 },
  { name: "Phụ kiện", image: cate5 },
  { name: "Gaming Gear", image: cate6 },
  { name: "RAM", image: cate7 },
  { name: "SSD", image: cate8 },
];

const CategoryMenu = () => {
  return (
    <div className="category-menu">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          <img src={category.image} alt={category.name} className="category-img" />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
