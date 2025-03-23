import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaShare, FaMinus, FaPlus } from 'react-icons/fa';
import "./ProductDetails.css";

const sampleProducts = [
  {
    id: 1,
    name: "Áo thun nam basic",
    image: "/assets/images/pd5.webp",
    oldPrice: 250000,
    newPrice: 180000,
    sold: 45,
    total: 100,
    category: "Nam",
    description: "Áo thun nam basic chất liệu cotton 100%, form regular fit thoải mái",
    rating: 4.5,
    reviews: 120,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xám", "Navy"]
  },
  // ... other products
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = sampleProducts.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image);

  if (!product) {
    return <div className="not-found">Không tìm thấy sản phẩm</div>;
  }

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev < product.total ? prev + 1 : prev);
    } else {
      setQuantity(prev => prev > 1 ? prev - 1 : 1);
    }
  };

  // Tạo mảng hình ảnh giả định cho gallery
  const productGallery = [
    product.image,
    `/assets/images/pd${product.id}_2.webp`,
    `/assets/images/pd${product.id}_3.webp`,
    `/assets/images/pd${product.id}_4.webp`,
  ];

  return (
    <div className="product-details-container">
      <div className="product-details-wrapper">
        {/* Left Section - Product Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="thumbnail-container">
            {productGallery.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`${product.name} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="product-meta">
              <div className="rating">
                <span className="stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index}
                      className={index < Math.floor(product.rating) ? 'filled' : 'empty'}
                    />
                  ))}
                </span>
                <span className="rating-text">{product.rating}</span>
                <span className="reviews">({product.reviews} đánh giá)</span>
              </div>
              <div className="sold-count">Đã bán: {product.sold}</div>
            </div>
          </div>

          <div className="product-price">
            <div className="current-price">
              {product.newPrice.toLocaleString()}đ
            </div>
            <div className="original-price">
              <span className="old-price">{product.oldPrice.toLocaleString()}đ</span>
              <span className="discount">
                -{Math.round((1 - product.newPrice/product.oldPrice) * 100)}%
              </span>
            </div>
          </div>

          <div className="product-options">
            <div className="size-selector">
              <h3>Kích thước</h3>
              <div className="options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="color-selector">
              <h3>Màu sắc</h3>
              <div className="options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <h3>Số lượng</h3>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange('decrease')}>
                  <FaMinus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange('increase')}>
                  <FaPlus />
                </button>
              </div>
              <span className="stock">Còn {product.total} sản phẩm</span>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart">
              <FaShoppingCart /> Thêm vào giỏ hàng
            </button>
            <button className="buy-now">
              Mua ngay
            </button>
          </div>

          <div className="additional-actions">
            <button className="wishlist">
              <FaHeart /> Yêu thích
            </button>
            <button className="share">
              <FaShare /> Chia sẻ
            </button>
          </div>

          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;