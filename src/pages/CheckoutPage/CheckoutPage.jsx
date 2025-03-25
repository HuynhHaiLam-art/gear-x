import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartSingleton from '../CartPage/CartSingleton';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems] = useState(CartSingleton.getItems());
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    district: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    calculateTotal();
  }, [cartItems, navigate]);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(subtotal - discount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDiscountCode = () => {
    // Demo discount code "WELCOME" for 10% off
    if (discountCode === 'WELCOME') {
      const discountAmount = totalPrice * 0.1;
      setDiscount(discountAmount);
      setTotalPrice(prev => prev - discountAmount);
      alert('Áp dụng mã giảm giá thành công!');
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!orderInfo.fullName || !orderInfo.phone || !orderInfo.address) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Create order object
    const order = {
      items: cartItems,
      totalPrice,
      discount,
      orderInfo,
      paymentMethod,
      orderId: `DH${Date.now()}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')
    };

    // Save order to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Clear cart
    CartSingleton.clearCart();

    // Navigate to success page
    navigate('/checkout/success');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p className="price">{Number(item.price).toLocaleString()}đ</p>
                </div>
              </div>
            ))}
          </div>

          <div className="discount-section">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={handleDiscountCode}>Áp dụng</button>
          </div>

          <div className="price-summary">
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{Number(totalPrice + discount).toLocaleString()}đ</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Giảm giá:</span>
                <span>-{Number(discount).toLocaleString()}đ</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Tổng cộng:</span>
              <span>{Number(totalPrice).toLocaleString()}đ</span>
            </div>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Thông tin đặt hàng</h2>
          <div className="form-group">
            <label>Họ tên *</label>
            <input
              type="text"
              name="fullName"
              value={orderInfo.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={orderInfo.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại *</label>
            <input
              type="tel"
              name="phone"
              value={orderInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="birthDate"
              value={orderInfo.birthDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Địa chỉ *</label>
            <input
              type="text"
              name="address"
              value={orderInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Thành phố</label>
              <input
                type="text"
                name="city"
                value={orderInfo.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Quận/Huyện</label>
              <input
                type="text"
                name="district"
                value={orderInfo.district}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Ghi chú</label>
            <textarea
              name="note"
              value={orderInfo.note}
              onChange={handleInputChange}
            />
          </div>

          <div className="payment-methods">
            <h3>Phương thức thanh toán</h3>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="banking"
                  checked={paymentMethod === 'banking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Chuyển khoản ngân hàng
              </label>
            </div>
          </div>

          <button type="submit" className="complete-order-button">
            Hoàn tất đơn hàng
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;