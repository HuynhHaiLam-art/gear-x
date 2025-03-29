import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import "./Auth.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập gọi API
    setTimeout(() => {
      console.log("Đăng nhập với:", formData, "Ghi nhớ:", remember);
      setIsLoading(false);
      // Thực hiện gọi API đăng nhập tại đây
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
              <h2 className="auth-title">Đăng Nhập</h2>
              <p className="auth-subtitle">Vui lòng nhập thông tin đăng nhập của bạn</p>
      
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-container">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
      
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <div className="input-container">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Nhập mật khẩu của bạn"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
      
                <div className="form-extras">
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      disabled={isLoading}
                    />
                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                  </div>
                  <a href="#" className="forgot-password">Quên mật khẩu?</a>
                </div>
      
                <button type="submit" className="auth-button" disabled={isLoading}>
                  {isLoading ? (
                    <span className="button-loading">
                      <FaSpinner className="spinner" /> Đang xử lý...
                    </span>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
      
                <div className="auth-divider">
                  <span>Hoặc đăng nhập với</span>
                </div>
      
                <div className="social-login">
                  <button type="button" className="social-button google">
                    <FaGoogle />
                  </button>
                  <button type="button" className="social-button facebook">
                    <FaFacebookF />
                  </button>
                  <button type="button" className="social-button apple">
                    <FaApple />
                  </button>
                </div>
      
                <div className="auth-footer">
                  <p>Chưa có tài khoản? <a href="#" className="register-link">Đăng ký ngay</a></p>
                </div>
              </form>
            </div>
    </div>
  );
};

export default LoginForm;