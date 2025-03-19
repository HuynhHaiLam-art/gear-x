import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

// Sample products data
const sampleProducts = [
  { id: 1, name: "Áo thun nam basic", image: "https://owlbrand.vn/wp-content/uploads/2024/12/AO-SWEATER-HOA-TIET-OWL-4-1-527x790.jpg", oldPrice: 250000, newPrice: 180000, sold: 45, total: 100, category: "Nam" },
  { id: 2, name: "Quần jeans nữ cá tính", image: "/assets/images/pd6.webp", oldPrice: 450000, newPrice: 320000, sold: 30, total: 80, category: "Nữ" },
  { id: 3, name: "Giày sneaker trắng nam", image: "C:/Users/Admin/Desktop/gear-x/src/assets/images/pd7.webp", oldPrice: 800000, newPrice: 650000, sold: 50, total: 120, category: "Nam" },
  { id: 4, name: "Túi xách nữ thời trang", image: "/assets/images/pd8.webp", oldPrice: 600000, newPrice: 450000, sold: 20, total: 50, category: "Nữ" },
];

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const product = sampleProducts.find((p) => p.id.toString() === id);

  if (!product) {
    return <h2>Không tìm thấy sản phẩm</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="category">Danh mục: {product.category}</p>
        <p className="price">
          Giá cũ: <span className="old-price">{product.oldPrice.toLocaleString()}đ</span>
        </p>
        <p className="price">
          Giá mới: <span className="new-price">{product.newPrice.toLocaleString()}đ</span>
        </p>
        <p className="sold">Đã bán: {product.sold}</p>
        <p className="total">Số lượng có sẵn: {product.total}</p>
        <button className="buy-now-button">Mua ngay</button>
      </div>
    </div>
  );
};

export default ProductDetails;