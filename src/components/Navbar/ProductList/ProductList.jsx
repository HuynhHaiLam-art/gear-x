import React, { useEffect, useState } from "react";
import "./ProductList.css";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?category=${category}`) // Giả lập API
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, [category]);

  return (
    <div className="product-list">
      <h2>Sản phẩm - {category}</h2>
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}₫</p>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
