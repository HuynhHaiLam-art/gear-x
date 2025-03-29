import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaShare, FaMinus, FaPlus, FaComments } from 'react-icons/fa';
import ProductService from '../ProductPage/ProductService';
import CartSingleton from "../CartPage/CartSingleton";
import "./ProductDetails.css";
import CartService from '../CartPage/CartService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);


  // Fetch all product data
  const fetchProductData = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const productResponse = await ProductService.getProduct(productId);
      console.log("productResponse", productResponse);
      

      if (!productResponse || !productResponse.data) {
        throw new Error('Không thể tải thông tin sản phẩm');
      }

      const productData = productResponse.data;
      console.log("productData", productData);
      setProduct(productData);
      setMainImage(productData.imageUrl || productData.image);
      // Extract unique sizes and colors from variants
      if (productData.variants && productData.variants.length > 0) {
        // Use Set to automatically remove duplicates
        const sizeSet = new Set(productData.variants.map(variant => variant.size));
        const colorSet = new Set(productData.variants.map(variant => variant.color));

        // Convert back to arrays
        setAvailableSizes([...sizeSet]);
        setAvailableColors([...colorSet]);

        // Set initial selected values if available
        if (sizeSet.size > 0) {
          setSelectedSize([...sizeSet][0]);
        }
        // if (colorSet.size > 0) {
        //   setSelectedColor([...colorSet][0]);
        // }
      }
      try {
        // const [variantsRes, reviewsRes, imagesRes] = await Promise.all([
        //   ProductService.getProductVariants(productId),
        //   ProductService.getProductReviews(productId),
        //   ProductService.getProductImages(productId)
        // ]);

        // setVariants(variantsRes?.data || []);
        // setReviews(reviewsRes?.data || []);
        // setProductImages(imagesRes?.data || []);

        // if (productData.categoryId) {
        //   const relatedRes = await ProductService.getRelatedProducts(productData.categoryId);
        //   setRelatedProducts(relatedRes?.data || []);
        // }
      } catch (error) {
        console.warn('Error fetching additional data:', error);
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    console.log('Selected size:', size);
    setSelectedSize(size);
  };

  // Add to cart handler
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
      
      // Call the CartService API to add item to cart
      const response = await CartService.addToCart(product.productId, quantity, product.variants[0].variantId);
      
      let cartItem = response.data;
      
      if (response.data) {
        // Also update the CartSingleton for local state
        CartSingleton.addItem({
          cartItemId: cartItem.items[0].cartItemId,
          id: product.productId,
          name: product.name,
          price: product.price,
          image: mainImage || product.imageUrl || product.image,
          size: selectedSize,
          quantity: quantity,

        });
         console.log("cartItem", cartItem.sessionId);
        //CartSingleton.setSessionId(cartItem.sessionId);

        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      }
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
      navigate('/cart'); // Navigate to cart page
    } catch (error) {
      console.error('Error buying product:', error);
      alert('Có lỗi xảy ra khi mua hàng!');
    }
  };

  // Chat handler
  const handleChat = () => {
    alert('Tính năng chat sẽ sớm ra mắt!');
  };

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
                  -{Math.round((1 - (product.price || product.newPrice) / (product.oldPrice || product.originalPrice)) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Size Selector */}
          <div className="size-selector">
            <h3>Chọn Size</h3>
            <div className="size-options">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="selected-size">Size đã chọn: {selectedSize}</p>
            )}
          </div>
{/* color Selector */}
{/* <div className="size-selector">
            <h3>Chọn Màu</h3>
            <div className="size-options">
              {availableColors.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="selected-size">Size đã chọn: {selectedSize}</p>
            )}
          </div> */}

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <h3>Số lượng</h3>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
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
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky-action-bar">
        <button className="chat-now" onClick={handleChat}>
          <FaComments />
          <span>Chat ngay</span>
        </button>
        <button
          className={`add-to-cart ${!selectedSize ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          <FaShoppingCart />
          <span>Thêm vào giỏ</span>
        </button>
        <button
          className={`buy-now ${!selectedSize ? 'disabled' : ''}`}
          onClick={handleBuyNow}
          disabled={!selectedSize}
        >
          <span>Mua ngay</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;