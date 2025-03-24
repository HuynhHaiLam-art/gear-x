import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductPage.css";
import ProductService from './ProductService';
import { FiShoppingCart, FiHeart, FiSearch, FiFilter } from 'react-icons/fi';

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getAllProducts();
        console.log("API Response:", response);
        
        // Process the response data - handle both array and single object
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data.items)) {
          productsData = response.data.items;
        } else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
          productsData = [response.data];
        }
        
        // Filter products by category if needed
        const filteredProducts = category 
          ? productsData.filter(product => 
              product.categoryName && 
              product.categoryName.toLowerCase() === category.toLowerCase()
            )
          : productsData;
        
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(`Failed to load products: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch(sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  if (loading) return (
    <div className="product-page loading-container">
      <div className="loading-spinner"></div>
      <p>Loading amazing products for you...</p>
    </div>
  );
  
  if (error) return (
    <div className="product-page error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  return (
    <div className="product-page">
      <div className="product-header">
        <h2>Products {category ? `- ${category}` : ""}</h2>
        <div className="product-controls">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <FiFilter className="filter-icon" />
            <select 
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>
      
      {sortedProducts && sortedProducts.length > 0 ? (
        <div className="product-list">
          {sortedProducts.map((product, index) => (
            <div key={product.productId || `product-${index}`} className="product-card">
              <div className="product-card-inner">
                {product.isNew && <span className="product-badge new">New</span>}
                {product.discount && <span className="product-badge discount">-{product.discount}%</span>}
                
                <div className="product-image-container">
                  <img 
                    src={product.imageUrl || "https://via.placeholder.com/150"} 
                    alt={product.name} 
                    className="product-image"
                  />
                  <div className="product-actions">
                    <button className="action-btn cart-btn" title="Add to cart">
                      <FiShoppingCart />
                    </button>
                    <button className="action-btn wishlist-btn" title="Add to wishlist">
                      <FiHeart />
                    </button>
                    <Link 
                      to={`/product-detail/${product.productId}`} 
                      className="action-btn view-btn" 
                      title="View details"
                    >
                      <FiSearch />
                    </Link>
                  </div>
                </div>
                
                <div className="product-details">
                  <Link to={`/product/${product.productId}`} className="product-name-link">
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  
                  <p className="product-category">{product.categoryName}</p>
                  
                  <div className="product-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= (product.averageRating || 4) ? 'filled' : ''}`}>★</span>
                    ))}
                    <span className="rating-count">({product.reviewsCount || 0})</span>
                  </div>
                  
                  <div className="product-price">
                    {product.oldPrice && (
                      <span className="old-price">{Number(product.oldPrice).toLocaleString()}đ</span>
                    )}
                    <span className="new-price">
                      {product.price ? Number(product.price).toLocaleString() : "N/A"}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>We couldn't find any products that match your criteria.</p>
          <button onClick={() => window.location.reload()} className="reload-btn">Reload Page</button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;