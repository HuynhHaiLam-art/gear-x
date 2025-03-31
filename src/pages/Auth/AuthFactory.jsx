import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "./UserService";
import "./Auth.css";
import { FiMail, FiLock, FiUser, FiPhone, FiLoader } from "react-icons/fi";

const AuthFactory = ({ type, setUser }) => {
  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (type === "login") {
        // API login call
        const credentials = {
          email: formData.email,
          password: formData.password
        };
        
        const response = await UserService.login(credentials);
       
        // Set user data and redirect based on role
        setUser(response.role);
        console.log("User role:", response.role);
        window.dispatchEvent(new Event("userLoggedIn"));
        if (response.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Mật khẩu xác nhận không khớp!");
        }
        
        // API register call
        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone
        };
        
        await UserService.register(userData);
        // Show success message and redirect to login
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{type === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
        <form onSubmit={handleSubmit}>
          {type === "register" && (
            <div className="input-group">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                name="fullName"
                placeholder="Họ và Tên" 
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="input-group">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <FiLock className="input-icon" />
            <input 
              type="password" 
              name="password"
              placeholder="Mật khẩu" 
              value={formData.password} 
              onChange={handleChange}
              required
            />
          </div>
          
          {type === "register" && (
            <>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Số điện thoại" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          
          {error && <p className="error-message">{error}</p>}
          
          <button 
            className={`auth-button ${loading ? 'loading' : ''}`} 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <FiLoader className="spinner" />
                {type === "login" ? "Đang đăng nhập..." : "Đang đăng ký..."}
              </>
            ) : (
              type === "login" ? "Đăng nhập" : "Đăng ký"
            )}
          </button>
        </form>
        
        <p className="auth-redirect">
          {type === "login" ? (
            <>
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </>
          ) : (
            <>
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthFactory;
