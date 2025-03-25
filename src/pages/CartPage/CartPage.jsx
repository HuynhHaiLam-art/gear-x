import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import CartSingleton from "./CartSingleton";
import CartObserver from "./CartObserver.jsx";

const CartPage = () => {
  const [items, setItems] = useState(CartSingleton.getItems());
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      const currentItems = CartSingleton.getItems();
      setItems([...currentItems]);
      // Tính tổng giá
      const total = currentItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
      setTotalPrice(total);
    };

    CartObserver.subscribe(updateCart);
    updateCart();

    return () => {
      CartObserver.unsubscribe(updateCart);
    };
  }, []);

  const handleRemoveItem = async (itemId) => {
    // Xóa item khỏi state trước để UI cập nhật ngay lập tức
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // Cập nhật tổng tiền
    setTotalPrice(prevTotal => {
      const removedItem = items.find(item => item.id === itemId);
      return prevTotal - (removedItem.price * removedItem.quantity);
    });

    // Xóa item từ CartSingleton và localStorage
    CartSingleton.removeItem(itemId);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    CartSingleton.updateItemQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng hiện đang trống.</p>
          <button onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p className="price">{Number(item.price).toLocaleString()}đ</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-content">
              <h3>Tổng tiền:</h3>
              <p>{Number(totalPrice).toLocaleString()}đ</p>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;