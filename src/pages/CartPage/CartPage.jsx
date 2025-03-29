import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import CartSingleton from "./CartSingleton";
import CartObserver from "./CartObserver.jsx";
import CartService from "../CartPage/CartService";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingItem, setLoadingItem] = useState(null);
  const navigate = useNavigate();

  // Function to refresh cart state
  const updateCart = () => {
    const currentItems = CartSingleton.getItems();
    setItems([...currentItems]);
    const total = currentItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    CartObserver.subscribe(updateCart);
    updateCart();
    return () => {
      CartObserver.unsubscribe(updateCart);
    };
  }, []);

  const handleRemoveItem = async (itemId, cartItemId) => {
    const uniqueId = itemId || cartItemId;
    try {
      setLoadingItem(uniqueId);
      const itemToRemove = items.find(
        (item) => item.id === itemId || item.cartItemId === itemId
      );

      if (!itemToRemove) {
        console.error("Item not found:", itemId);
        return;
      }

      const priceReduction = itemToRemove.price * itemToRemove.quantity;
      setItems((prevItems) =>
        prevItems.filter(
          (item) => item.id !== itemId && item.cartItemId !== itemId
        )
      );
      setTotalPrice((prevTotal) => prevTotal - priceReduction);
      CartSingleton.removeItem(itemId);
      const response = await CartService.removeFromCart(cartItemId);
      console.log("response", response);
    } catch (error) {
      console.error("Error removing item:", error);
      updateCart();
    } finally {
      setLoadingItem(null);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    CartSingleton.updateItemQuantity(itemId, newQuantity);
    updateCart();
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h2>Giỏ hàng của bạn</h2>
      </header>
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng hiện đang trống.</p>
          <button onClick={() => navigate("/")}>Tiếp tục mua sắm</button>
        </div>
      ) : (
        <>
          <section className="cart-items-section">
            {items.map((item) => {
              const uniqueId = item.id || item.cartItemId;
              return (
                <div key={uniqueId} className="cart-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p className="price">
                      {Number(item.price).toLocaleString()}đ
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleUpdateQuantity(uniqueId, item.quantity - 1)}
                        disabled={item.quantity <= 1 || loadingItem === uniqueId}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(uniqueId, item.quantity + 1)}
                        disabled={loadingItem === uniqueId}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id, item.cartItemId)}
                    disabled={loadingItem === uniqueId}
                  >
                    {loadingItem === uniqueId ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              );
            })}
          </section>
          <footer className="cart-summary">
            <div className="summary-content">
              <h3>Tổng tiền:</h3>
              <p>{Number(totalPrice).toLocaleString()}đ</p>
            </div>
            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={loadingItem !== null}
            >
              Thanh toán
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default CartPage;
