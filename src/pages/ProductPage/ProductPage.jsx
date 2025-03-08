import React from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = ({ products }) => {
  const { category } = useParams();
  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <div className="product-page">
      <h2>Sản phẩm - {category}</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="old-price">{product.oldPrice.toLocaleString()}đ</p>
              <p className="new-price">{product.newPrice.toLocaleString()}đ</p>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
