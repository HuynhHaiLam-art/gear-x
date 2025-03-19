import React from "react";
import "./AdminPage.css";

const sampleProducts = [
  { id: 1, name: "Áo thun nam basic", category: "Nam", stock: 100 },
  { id: 2, name: "Quần jeans nữ", category: "Nữ", stock: 80 },
  { id: 3, name: "Giày sneaker", category: "Nam", stock: 120 },
  { id: 4, name: "Túi xách nữ", category: "Nữ", stock: 50 },
];

const AdminPage = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="admin-info">
          <img
            src="https://via.placeholder.com/80"
            alt="Admin Avatar"
            className="admin-avatar"
          />
          <h3>Admin</h3>
        </div>
        <ul className="menu">
          <li>Quản lý sản phẩm</li>
          <li>Quản lý đơn hàng</li>
          <li>Quản lý khách hàng</li>
          <li>Thống kê & báo cáo</li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Quản lý sản phẩm</h1>
        <button className="add-product">Thêm sản phẩm</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sampleProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="edit-btn">Sửa</button>
                  <button className="detail-btn">Chi tiết</button>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminPage;
