import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"; // Nếu có CSS riêng

// Giả sử danh sách sản phẩm được truyền vào
const sampleProducts = [
  { id: 1, name: "Áo thun nam basic", image: "/assets/images/pd5.webp", oldPrice: 250000, newPrice: 180000, sold: 45, total: 100, category: "Nam" },
  { id: 2, name: "Quần jeans nữ cá tính", image: "/assets/images/pd6.webp", oldPrice: 450000, newPrice: 320000, sold: 30, total: 80, category: "Nữ" },
  { id: 3, name: "Giày sneaker trắng nam", image: "/assets/images/pd7.webp", oldPrice: 800000, newPrice: 650000, sold: 50, total: 120, category: "Nam" },
  { id: 4, name: "Túi xách nữ thời trang", image: "/assets/images/pd8.webp", oldPrice: 600000, newPrice: 450000, sold: 20, total: 50, category: "Nữ" },
];

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const product = sampleProducts.find((p) => p.id.toString() === id);

  if (!product) {
    return <h2>Không tìm thấy sản phẩm</h2>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Giá cũ: <span className="old-price">{product.oldPrice.toLocaleString()}đ</span></p>
      <p>Giá mới: <span className="new-price">{product.newPrice.toLocaleString()}đ</span></p>
      <button>Mua ngay</button>
    </div>
  );
};

export default ProductDetails;
