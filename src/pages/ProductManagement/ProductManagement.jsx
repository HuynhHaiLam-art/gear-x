import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus
} from "react-icons/fi";
import "./ProductManagement.css";
import "../AdminPage/AdminPage.css";
import ProductService from "./ProductService.jsx";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    variants: [{ color: "", size: "", stockQuantity: 1 }]
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    productId: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          ProductService.getProducts(),
          ProductService.getCategories()
        ]);
        
        console.log("Categories:", categoriesData);
        setProducts(productsData || []);
        setCategories(categoriesData || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index][field] = value;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const addVariantField = () => {
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, { color: "", size: "", stockQuantity: 1 }]
    });
  };

  const removeVariantField = (index) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants.splice(index, 1);
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const handleAddProduct = () => {
    setIsAdding(true);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      categoryId: categories.length > 0 ? categories[0].categoryId : "",
      imageUrl: "",
      variants: [{ color: "", size: "", stockQuantity: 1 }]
    });
  };

  const handleSaveProduct = async () => {
    try {
      setLoading(true);
      // Format data for API
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        categoryId: parseInt(newProduct.categoryId),
        imageUrl: newProduct.imageUrl,
        variants: newProduct.variants.map(v => ({
          color: v.color,
          size: v.size,
          stockQuantity: parseInt(v.stockQuantity)
        }))
      };

      const result = await ProductService.createProduct(productData);
      setProducts([...products, result]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        imageUrl: "",
        variants: [{ color: "", size: "", stockQuantity: 1 }]
      });
      setIsAdding(false);
      setError(null);
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      variants: [{ color: "", size: "", stockQuantity: 1 }]
    });
    setError(null);
  };

  const handleDeleteProduct = (id) => {
    setDeleteConfirmation({ show: true, productId: id });
  };

  const confirmDeleteProduct = async () => {
    const idToDelete = deleteConfirmation.productId;
    try {
      setLoading(true);
      await ProductService.deleteProduct(idToDelete);
      setProducts(products.filter((product) => product.productId !== idToDelete));
      setDeleteConfirmation({ show: false, productId: null });
      setError(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteProduct = () => {
    setDeleteConfirmation({ show: false, productId: null });
  };

  const handleEditProduct = async (productId) => {
    try {
      setLoading(true);
      const product = await ProductService.getProduct(productId);
      
      setNewProduct({
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        categoryId: product.categoryId.toString(),
        imageUrl: product.imageUrl,
        variants: product.variants.length > 0 
          ? product.variants.map(v => ({
              variantId: v.variantId,
              color: v.color,
              size: v.size,
              stockQuantity: v.stockQuantity
            }))
          : [{ color: "", size: "", stockQuantity: 1 }]
      });
      
      setIsEditing(productId);
      setError(null);
    } catch (err) {
      console.error("Error fetching product for edit:", err);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      variants: [{ color: "", size: "", stockQuantity: 1 }]
    });
    setError(null);
  };

  const handleUpdateProduct = async () => {
    try {
      setLoading(true);
      const productData = {
        productId: newProduct.productId,
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        categoryId: parseInt(newProduct.categoryId),
        imageUrl: newProduct.imageUrl,
        variants: newProduct.variants.map(v => ({
          variantId: v.variantId || undefined,
          color: v.color,
          size: v.size,
          stockQuantity: parseInt(v.stockQuantity)
        }))
      };

      const updatedProduct = await ProductService.updateProduct(newProduct.productId, productData);
      
      setProducts(products.map(p => 
        p.productId === updatedProduct.productId ? updatedProduct : p
      ));
      
      setIsEditing(null);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        imageUrl: "",
        variants: [{ color: "", size: "", stockQuantity: 1 }]
      });
      setError(null);
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AdminContainer>
      

      <div className="admin-content">
        <header className="admin-header">
          <div className="header-left">
           
            <h1>Product Management</h1>
            <button onClick={handleAddProduct} disabled={isAdding || loading}>
              <FiPlus className="button-icon" />
              {isAdding ? "Adding..." : "Add Product"}
            </button>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <img src="https://traicho.com/wp-content/uploads/2024/07/cat-anh-long-ngan-1-3.v" alt="Admin" />
              <span>Admin User</span>
            </div>
          </div>
        </header>

        <main className="admin-main">
          {error && <div className="error-message">{error}</div>}
          
          {loading && !isAdding && !isEditing ? (
            <div className="loading-container">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p>Loading products...</p>
            </div>
          ) : isAdding ? (
            <div className="add-product-form">
              <h2>Add New Product</h2>
              
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (VND)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="categoryId">Category</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={newProduct.categoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                />
                {newProduct.imageUrl && (
                  <div className="image-preview">
                    <img src={newProduct.imageUrl} alt="Product Preview" />
                  </div>
                )}
              </div>
              
              <div className="variants-section">
                <div className="variants-header">
                  <h3>Variants</h3>
                  <button 
                    type="button" 
                    className="add-variant-btn"
                    onClick={addVariantField}
                  >
                    <FiPlus /> Add Variant
                  </button>
                </div>
                
                {newProduct.variants.map((variant, index) => (
                  <div className="variant-row" key={index}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Color</label>
                        <input
                          type="text"
                          placeholder="Color"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Size</label>
                        <input
                          type="text"
                          placeholder="Size"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Stock Quantity</label>
                        <input
                          type="number"
                          placeholder="Stock Quantity"
                          value={variant.stockQuantity}
                          onChange={(e) => handleVariantChange(index, "stockQuantity", e.target.value)}
                        />
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="remove-variant-btn"
                      onClick={() => removeVariantField(index)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="form-actions">
                <button onClick={handleSaveProduct} disabled={loading}>
                  Save Product
                </button>
                <button onClick={handleCancelAdd} disabled={loading}>
                  Cancel
                </button>
              </div>
            </div>
          ) : isEditing ? (
            <div className="edit-product-form">
              <h2>Edit Product</h2>
              
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (VND)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="categoryId">Category</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={newProduct.categoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                />
                {newProduct.imageUrl && (
                  <div className="image-preview">
                    <img src={newProduct.imageUrl} alt="Product Preview" />
                  </div>
                )}
              </div>
              
              <div className="variants-section">
                <div className="variants-header">
                  <h3>Variants</h3>
                  <button 
                    type="button" 
                    className="add-variant-btn"
                    onClick={addVariantField}
                  >
                    <FiPlus /> Add Variant
                  </button>
                </div>
                
                {newProduct.variants.map((variant, index) => (
                  <div className="variant-row" key={index}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Color</label>
                        <input
                          type="text"
                          placeholder="Color"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Size</label>
                        <input
                          type="text"
                          placeholder="Size"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Stock Quantity</label>
                        <input
                          type="number"
                          placeholder="Stock Quantity"
                          value={variant.stockQuantity}
                          onChange={(e) => handleVariantChange(index, "stockQuantity", e.target.value)}
                        />
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="remove-variant-btn"
                      onClick={() => removeVariantField(index)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="form-actions">
                <button onClick={handleUpdateProduct} disabled={loading}>
                  Update Product
                </button>
                <button onClick={handleCancelEdit} disabled={loading}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="product-list">
              
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Variants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId}>
                      <td>
                        <img
                          src={product.imageUrl || "https://via.placeholder.com/50"}
                          alt={product.name}
                          className="product-thumbnail"
                        />
                      </td>
                      <td className="product-name-cell">{product.name}</td>
                      <td>{categories.find(c => c.categoryId === product.categoryId)?.categoryName || "Unknown"}</td>
                      <td>{product.price.toLocaleString()} VND</td>
                      <td>
                        {product.variants.length > 0 ? (
                          <span className="variants-badge">{product.variants.length} Variants</span>
                        ) : (
                          <span className="no-variants">No Variants</span>
                        )}
                      </td>
                      <td className="action-buttons">
                        <button onClick={() => handleEditProduct(product.productId)}>
                          <FiEdit />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.productId)}>
                          <FiTrash2 />
                        </button>
                        <button>
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {deleteConfirmation.show && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button onClick={confirmDeleteProduct} disabled={loading}>
                Yes, Delete
              </button>
              <button onClick={cancelDeleteProduct} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminContainer>
  );
};

export default ProductManagement;