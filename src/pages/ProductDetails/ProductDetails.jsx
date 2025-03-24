import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaShare, FaMinus, FaPlus, FaComments } from 'react-icons/fa';
import ProductService from '../ProductPage/ProductService';
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [productImages, setProductImages] = useState([]);

  // Default sizes if no variants available
  const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Fetch all product data
  const fetchProductData = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      // Get main product data first
      const productResponse = await ProductService.getProduct(productId);
      
      if (!productResponse || !productResponse.data) {
        throw new Error('Không thể tải thông tin sản phẩm');
      }

      const productData = productResponse.data;
      setProduct(productData);
      setMainImage(productData.imageUrl || productData.image);

      // Then fetch additional data
      try {
        const [variantsRes, reviewsRes, imagesRes] = await Promise.all([
          ProductService.getProductVariants(productId),
          ProductService.getProductReviews(productId),
          ProductService.getProductImages(productId)
        ]);

        setVariants(variantsRes?.data || []);
        setReviews(reviewsRes?.data || []);
        setProductImages(imagesRes?.data || []);

        // Fetch related products after we have the category
        if (productData.categoryId) {
          const relatedRes = await ProductService.getRelatedProducts(productData.categoryId);
          setRelatedProducts(relatedRes?.data || []);
        }

        // Set default selected options if variants exist
        if (variantsRes?.data?.length > 0) {
          setSelectedSize(variantsRes.data[0].size || '');
          setSelectedColor(variantsRes.data[0].color || '');
        }
      } catch (error) {
        console.warn('Error fetching additional product data:', error);
      }

    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message || 'Có lỗi xảy ra khi tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Add to cart handler with error handling
  const handleAddToCart = async () => {
    try {
      if (!selectedSize) {
        alert('Vui lòng chọn size!');
        return;
      }

      if (quantity <= 0) {
        alert('Vui lòng chọn số lượng hợp lệ!');
        return;
      }

      const selectedVariant = variants.find(
        v => v.size === selectedSize && v.color === selectedColor
      );

      await ProductService.addToCart(id, quantity, selectedVariant?.id);
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
    }
  };

  // Buy now handler
  const handleBuyNow = async () => {
    try {
      if (!selectedSize) {
        alert('Vui lòng chọn size!');
        return;
      }
      await handleAddToCart();
      window.location.href = '/checkout';
    } catch (error) {
      console.error('Error buying product:', error);
      alert('Có lỗi xảy ra khi mua hàng!');
    }
  };

  // Chat handler
  const handleChat = () => {
    alert('Tính năng chat sẽ sớm ra mắt!');
  };

  // Initialize data on component mount
  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>Không tìm thấy sản phẩm</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-wrapper">
        {/* Left Section - Product Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImage || product.imageUrl || product.image} alt={product.name} />
          </div>
          {productImages.length > 0 && (
            <div className="thumbnail-container">
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${mainImage === img.url ? 'active' : ''}`}
                  onClick={() => setMainImage(img.url)}
                >
                  <img src={img.url} alt={`${product.name} - ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
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
                      className={index < Math.floor(product.rating || 0) ? 'filled' : 'empty'}
                    />
                  ))}
                </span>
                <span className="reviews">({reviews.length} đánh giá)</span>
              </div>
              {product.sold && <div className="sold-count">Đã bán: {product.sold}</div>}
            </div>
          </div>

          <div className="product-price">
            <div className="current-price">
              {Number(product.price || product.newPrice).toLocaleString()}đ
            </div>
            {(product.oldPrice || product.originalPrice) && (
              <div className="original-price">
                <span className="old-price">
                  {Number(product.oldPrice || product.originalPrice).toLocaleString()}đ
                </span>
                <span className="discount">
                  -{Math.round((1 - (product.price || product.newPrice)/(product.oldPrice || product.originalPrice)) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Size Selector */}
          <div className="size-selector">
            <h3>Chọn Size</h3>
            <div className="size-options">
              {defaultSizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector (if variants available) */}
          {variants.length > 0 && (
            <div className="color-selector">
              <h3>Màu sắc</h3>
              <div className="options">
                {[...new Set(variants.map(v => v.color))].map(color => (
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
          )}

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <h3>Số lượng</h3>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                disabled={quantity >= (product.stockQuantity || 99)}
              >
                <FaPlus />
              </button>
            </div>
            {product.stockQuantity && (
              <span className="stock">Còn {product.stockQuantity} sản phẩm</span>
            )}
          </div>

          {/* Product Description */}
          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="related-products">
              <h3>Sản phẩm liên quan</h3>
              <div className="related-products-grid">
                {relatedProducts.map(relatedProduct => (
                  <Link 
                    to={`/product/${relatedProduct.id}`} 
                    key={relatedProduct.id} 
                    className="related-product-card"
                  >
                    <img 
                      src={relatedProduct.imageUrl || relatedProduct.image} 
                      alt={relatedProduct.name} 
                    />
                    <h4>{relatedProduct.name}</h4>
                    <p>{Number(relatedProduct.price || relatedProduct.newPrice).toLocaleString()}đ</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky-action-bar">
        <button className="chat-now" onClick={handleChat}>
          <FaComments />
          <span>Chat ngay</span>
        </button>
        <button className="add-to-cart" onClick={handleAddToCart}>
          <FaShoppingCart />
          <span>Thêm vào giỏ</span>
        </button>
        <button className="buy-now" onClick={handleBuyNow}>
          <span>Mua ngay</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;