import React, { useState, useEffect } from "react";
import "./CartPage.css";
import CartSingleton from "./CartSingleton";
import CartObserver from "./CartObserver.jsx";

const CartPage = () => {
  const [items, setItems] = useState(CartSingleton.getItems());

  useEffect(() => {
    const updateCart = () => setItems([...CartSingleton.getItems()]);
    CartObserver.subscribe(updateCart);

    return () => {
      // Cleanup khi component unmount
    };
  }, []);

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng hiện đang trống.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}đ
              <button onClick={() => CartSingleton.removeItem(item.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
