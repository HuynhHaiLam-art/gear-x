import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import UserService from "../../services/UserService.jsx";
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    role: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    userId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAllUsers();
      console.log("API users data:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      // Fallback to mock data if API fails
      const mockUsers = [
        { id: 1, userName: "User 1", email: "user1@example.com", role: "Admin" },
        { id: 2, userName: "User 2", email: "user2@example.com", role: "Editor" },
        { id: 3, userName: "User 3", email: "user3@example.com", role: "Viewer" },
      ];
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    setIsAdding(true);
    setNewUser({
      userName: "",
      email: "",
      role: "",
      password: "", // Add password field for new users
    });
  };

  const handleSaveUser = async () => {
    try {
      // Validate form
      if (!newUser.userName || !newUser.email || !newUser.role || !newUser.password) {
        toast.error("All fields are required");
        return;
      }

      const userData = { ...newUser };
      const response = await UserService.createUser(userData);
      console.log("User created:", response);
      toast.success("User created successfully");
      
      // Refresh the users list after adding
      fetchUsers();
      
      // Reset form and state
      setNewUser({ userName: "", email: "", role: "", password: "" });
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewUser({ userName: "", email: "", role: "", password: "" });
  };

  const handleDeleteUser = (id) => {
    setDeleteConfirmation({ show: true, userId: id });
  };

  const confirmDeleteUser = async () => {
    const idToDelete = deleteConfirmation.userId;
    try {
      await UserService.deleteUser(idToDelete);
      toast.success("User deleted successfully");
      
      // Remove from local state
      setUsers(users.filter((user) => user.id !== idToDelete));
      setDeleteConfirmation({ show: false, userId: null });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const cancelDeleteUser = () => {
    setDeleteConfirmation({ show: false, userId: null });
  };

  const handleEditUser = async (user) => {
    try {
      // Optionally fetch the latest user data
      const userData = await UserService.getUserById(user.id);
      setIsEditing(user.id);
      
      // Only include fields that can be updated
      setNewUser({
        userName: userData.userName,
        email: userData.email,
        role: userData.role,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
      // Use the data we already have
      setIsEditing(user.id);
      setNewUser({
        userName: user.userName,
        email: user.email,
        role: user.role,
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewUser({ userName: "", email: "", role: "" });
  };

  const handleUpdateUser = async () => {
    try {
      // Validate form
      if (!newUser.userName || !newUser.email || !newUser.role) {
        toast.error("All fields are required");
        return;
      }

      const response = await UserService.updateUser(isEditing, newUser);
      console.log("User updated:", response);
      toast.success("User updated successfully");
      
      fetchUsers(); // Refresh the user list to get updated data
      setIsEditing(null);
      setNewUser({ userName: "", email: "", role: "" });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(
      user => 
        user.userName?.toLowerCase().includes(value.toLowerCase()) ||
        user.email?.toLowerCase().includes(value.toLowerCase()) ||
        user.role?.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  };

  if (loading) {
    return <div className="loading-spinner">Loading users...</div>;
  }

  return (
    <AdminContainer>
    <div className="user-management-container">
      <div className="user-management-header">
        <h2>User Management</h2>
        <div className="user-controls">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button onClick={handleAddUser} disabled={isAdding} className="action-btn add-user-btn">
            {isAdding ? "Adding..." : <><FiPlus /> Add User</>}
          </button>
        </div>
      </div>
      <main className="user-management-main">
        {isAdding ? (
          <div className="add-user-form">
            <h2>Add New User</h2>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={newUser.userName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <div className="form-buttons">
              <button onClick={handleSaveUser}>Save</button>
              <button onClick={handleCancelAdd}>Cancel</button>
            </div>
          </div>
        ) : isEditing ? (
          <div className="edit-user-form">
            <h2>Edit User</h2>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={newUser.userName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <div className="form-buttons">
              <button onClick={handleUpdateUser}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit" onClick={() => handleEditUser(user)}>
                          <FiEdit />
                        </button>
                     
                        <button
                          className="delete"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <FiTrash2 />
                        </button>
                        <button>
                          <FiEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-message">
                    {searchTerm ? "No users found matching your search" : "No users available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>

      {deleteConfirmation.show && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-box">
            <p>Are you sure you want to delete this user?</p>
            <div className="delete-confirmation-buttons">
              <button className="confirm" onClick={confirmDeleteUser}>
                Confirm
              </button>
              <button className="cancel" onClick={cancelDeleteUser}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminContainer>
  );
};

export default UserManagement;