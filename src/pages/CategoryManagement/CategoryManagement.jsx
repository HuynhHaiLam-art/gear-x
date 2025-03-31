import React, { useState, useEffect } from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import CategoryService from "./CategoryService.jsx";
import { toast } from 'react-toastify';
import "./CategoryManagement.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "",
    parentCategoryId: ""
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    categoryId: null
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setIsAdding(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newCategory.categoryName?.trim()) {
      newErrors.categoryName = "Tên danh mục không được để trống";
    }
    
    if (!newCategory.description?.trim()) {
      newErrors.description = "Mô tả không được để trống";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCategory = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isEditing) {
        await CategoryService.updateCategory(isEditing, {
          categoryName: newCategory.categoryName,
          description: newCategory.description,
          parentCategoryId: newCategory.parentCategoryId
        });
        toast.success("Cập nhật danh mục thành công");
      } else {
        await CategoryService.createCategory({
          categoryName: newCategory.categoryName,
          description: newCategory.description,
          parentCategoryId: 1
        });
        toast.success("Thêm danh mục mới thành công");
      }
      
      fetchCategories(); // Refresh danh sách
      setIsAdding(false);
      setIsEditing(null);
      setNewCategory({ name: "", description: "", parentCategoryId: 1 });
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(isEditing ? "Lỗi khi cập nhật danh mục" : "Lỗi khi thêm danh mục mới");
      }
      console.error("Error saving category:", error);
    }
  };

  const handleEditCategory = async (category) => {
    try {
      const categoryDetail = await CategoryService.getCategoryById(category.categoryId);
      setIsEditing(category.categoryId);
      setNewCategory({
        categoryName: categoryDetail.categoryName,
        description: categoryDetail.description,
        parentCategoryId: categoryDetail.parentCategoryId
        
      });
    } catch (error) {
      toast.error("Không thể tải thông tin danh mục");
      console.error("Error fetching category details:", error);
    }
  };

  const handleDeleteCategory = (id) => {
    setDeleteConfirmation({ show: true, categoryId: id });
  };

  const confirmDelete = async () => {
    try {
      await CategoryService.deleteCategory(deleteConfirmation.categoryId);
      toast.success("Xóa danh mục thành công");
      fetchCategories(); // Refresh danh sách
      setDeleteConfirmation({ show: false, categoryId: null });
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục");
      console.error("Error deleting category:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    
    if (!searchValue.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const searchResults = categories.filter((category) => {
      return (
        category.categoryName.toLowerCase().includes(searchValue.toLowerCase()) ||
        category.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        category.categoryId.toString().includes(searchValue)
      );
    });

    setFilteredCategories(searchResults);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <AdminContainer>
      <div className="category-management-container">
        <div className="category-management-header">
          <h2>Quản lý danh mục</h2>
          <div className="category-controls">
            <SearchBar 
              placeholder="Tìm kiếm danh mục..." 
              onSearch={handleSearch}
            />
            <button className="add-category-btn" onClick={handleAddCategory}>
              <FiPlus /> Thêm danh mục
            </button>
          </div>
        </div>

        {(isAdding || isEditing) && (
          <div className="category-form">
            <h3>{isEditing ? "Sửa danh mục" : "Thêm danh mục mới"}</h3>
            <div className="form-group">
              <label>Tên danh mục:</label>
              <input
                type="text"
                name="categoryName"
                value={newCategory.categoryName}
                onChange={handleInputChange}
                placeholder="Nhập tên danh mục"
                className={errors.categoryName ? "error" : ""}
              />
              {errors.categoryName && <span className="error-message">{errors.categoryName}</span>}
            </div>
            <div className="form-group">
              <label>Mô tả:</label>
              <textarea
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả"
              />
            </div>
           
            <div className="form-buttons">
              <button className="btn-save" onClick={handleSaveCategory}>
                {isEditing ? "Cập nhật" : "Thêm mới"}
              </button>
              <button 
                className="btn-cancel" 
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(null);
                  setNewCategory({ categoryName: "", description: "", parentCategoryId: 1 });
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Số sản phẩm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.categoryId}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.description}</td>
                  <td>{category.productCount}</td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEditCategory(category)}
                    >
                      <FiEdit />
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteCategory(category.categoryId)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  {searchTerm ? "Không tìm thấy danh mục phù hợp" : "Chưa có danh mục nào"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {deleteConfirmation.show && (
          <div className="delete-confirmation-overlay">
            <div className="delete-confirmation-box">
              <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
              <div className="confirmation-buttons">
                <button className="btn-confirm" onClick={confirmDelete}>
                  Xác nhận
                </button>
                <button 
                  className="btn-cancel"
                  onClick={() => setDeleteConfirmation({ show: false, categoryId: null })}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminContainer>
  );
};

export default CategoryManagement; 