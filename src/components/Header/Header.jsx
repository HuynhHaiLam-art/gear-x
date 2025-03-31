import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Header.css";
import UserService from "../../pages/Auth/UserService";

const Header = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const handleLoginEvent = () => {
      setUserEmail(localStorage.getItem("authToken"));
    };

    window.addEventListener("userLoggedIn", handleLoginEvent);
    return () => {
      window.removeEventListener("userLoggedIn", handleLoginEvent);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserEmail(localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log("User email:", userEmail);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for email:", userEmail);
        const response = await UserService.getProfileByEmail(userEmail);
        console.log("Response from UserService.getUserData:", response);
        if (response && response.data) {
          console.log("User data:", response.data);
          setUserName(response.data.fullName);
        } else {
          console.warn("No data found in response.");
        }
        setUserName(response.data.fullName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);
  return (
    <header className="main-header">
      <div className="header-top">
        <div className="logo">FASHIONISTA</div>

        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sản phẩm..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        <div className="contact">
          <FaPhoneAlt /> <span>Hotline: 1900 1234</span>
        </div>

        <div className="store">
          <span>Cửa hàng</span> <AiOutlineDown />
        </div>

        <div className="user-actions">
          {userName ? (
            <div className="user-info">
              <AiOutlineUser /> <span>Xin chào, {userName}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="login">
                <AiOutlineUser /> <span>Đăng nhập</span>
              </Link>
              <Link to="/register" className="register">
                <span>Đăng ký</span>
              </Link>
            </>
          )}
          <Link to="/cart" className="cart">
            <FaShoppingCart /> <span>Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;