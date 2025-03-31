import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../components/AdminContainer/AdminContainer.jsx";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - trong thực tế sẽ fetch từ API
    const mockOrder = {
      id: id,
      customer: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      date: "2024-01-01",
      status: "Pending",
      total: 1500000,
      shippingAddress: "123 Đường ABC, Quận XYZ, TP.HCM",
      items: [
        {
          id: 1,
          name: "Sản phẩm 1",
          price: 500000,
          quantity: 2,
          subtotal: 1000000
        },
        {
          id: 2,
          name: "Sản phẩm 2",
          price: 250000,
          quantity: 2,
          subtotal: 500000
        }
      ]
    };

    setOrder(mockOrder);
    setLoading(false);
  }, [id]);

  const handleConfirmOrder = () => {
    console.log("Xác nhận đơn hàng:", id);
    // Thêm logic xác nhận đơn hàng
  };

  const handleCancelOrder = () => {
    console.log("Hủy đơn hàng:", id);
    // Thêm logic hủy đơn hàng
  };

  const handleProcessOrder = () => {
    console.log("Xử lý đơn hàng:", id);
    // Thêm logic xử lý đơn hàng
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <AdminContainer>
      <div className="order-detail-container">
        <div className="order-detail-header">
          <h2>Chi tiết đơn hàng #{id}</h2>
          <div className="order-status">{order.status}</div>
        </div>

        <div className="order-sections">
          <div className="order-section">
            <h3>Thông tin khách hàng</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Tên khách hàng:</label>
                <span>{order.customer}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{order.email}</span>
              </div>
              <div className="info-item">
                <label>Số điện thoại:</label>
                <span>{order.phone}</span>
              </div>
              <div className="info-item">
                <label>Địa chỉ giao hàng:</label>
                <span>{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          <div className="order-section">
            <h3>Chi tiết sản phẩm</h3>
            <table className="products-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString()}đ</td>
                    <td>{item.quantity}</td>
                    <td>{item.subtotal.toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Tổng cộng:</td>
                  <td>{order.total.toLocaleString()}đ</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="order-actions">
            <button 
              className="btn-confirm"
              onClick={handleConfirmOrder}
            >
              Xác nhận đơn hàng
            </button>
            <button 
              className="btn-process"
              onClick={handleProcessOrder}
            >
              Xử lý đơn hàng
            </button>
            <button 
              className="btn-cancel"
              onClick={handleCancelOrder}
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default OrderDetail; 