import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    userId: null,
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockUsers = [
      { id: 1, name: "User 1", email: "user1@example.com", role: "Admin" },
      { id: 2, name: "User 2", email: "user2@example.com", role: "Editor" },
      { id: 3, name: "User 3", email: "user3@example.com", role: "Viewer" },
    ];
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    setIsAdding(true);
  };

  const handleSaveUser = () => {
    console.log("Saving user:", newUser);
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: "", email: "", role: "" });
    setIsAdding(false);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewUser({ name: "", email: "", role: "" });
  };

  const handleDeleteUser = (id) => {
    setDeleteConfirmation({ show: true, userId: id });
  };

  const confirmDeleteUser = () => {
    const idToDelete = deleteConfirmation.userId;
    console.log("Deleting user with id:", idToDelete);
    setUsers(users.filter((user) => user.id !== idToDelete));
    setDeleteConfirmation({ show: false, userId: null });
  };

  const cancelDeleteUser = () => {
    setDeleteConfirmation({ show: false, userId: null });
  };

  const handleEditUser = (user) => {
    setIsEditing(user.id);
    setNewUser({ ...user });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewUser({ name: "", email: "", role: "" });
  };

  const handleUpdateUser = () => {
    console.log("Updating user:", newUser);
    setUsers(
      users.map((user) =>
        user.id === newUser.id ? newUser : user
      )
    );
    setIsEditing(null);
    setNewUser({ name: "", email: "", role: "" });
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <AdminContainer>
    <div className="user-management-container">
      <header className="user-management-header">
        <h1>User Management</h1>
        <button onClick={handleAddUser} disabled={isAdding}>
          {isAdding ? "Adding..." : "Add User"}
        </button>
      </header>
      <main className="user-management-main">
        {isAdding ? (
          <div className="add-user-form">
            <h2>Add New User</h2>
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={newUser.name}
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
              type="text"
              name="role"
              placeholder="Role"
              value={newUser.role}
              onChange={handleInputChange}
            />
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
              name="name"
              placeholder="User Name"
              value={newUser.name}
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
              type="text"
              name="role"
              placeholder="Role"
              value={newUser.role}
              onChange={handleInputChange}
            />
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit" onClick={() => handleEditUser(user)}>
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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