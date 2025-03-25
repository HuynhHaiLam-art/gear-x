import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="success-container">
        <h2>Không tìm thấy thông tin đơn hàng</h2>
        <Link to="/" className="continue-shopping">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-header">
          <h2>Đặt hàng thành công!</h2>
          <p className="thank-you">Cảm ơn bạn đã mua hàng tại Gear-X</p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
            <p><strong>Thời gian giao hàng dự kiến:</strong> {order.estimatedDelivery}</p>
          </div>

          <div className="customer-info">
            <h3>Thông tin người nhận</h3>
            <p>{order.orderInfo.fullName}</p>
            <p>{order.orderInfo.phone}</p>
            <p>{order.orderInfo.address}</p>
            {order.orderInfo.district && order.orderInfo.city && (
              <p>{order.orderInfo.district}, {order.orderInfo.city}</p>
            )}
          </div>

          <div className="payment-info">
            <h3>Phương thức thanh toán</h3>
            <p>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}</p>
          </div>
        </div>

        <Link to="/" className="continue-shopping">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;