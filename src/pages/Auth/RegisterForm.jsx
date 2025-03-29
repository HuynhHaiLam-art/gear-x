import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import "./Auth.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không trùng khớp!");
      return;
    }
    console.log("Đăng ký với:", formData);
    // Thực hiện gọi API đăng ký tại đây
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Đăng Ký</h2>
        <p className="auth-subtitle">Vui lòng nhập thông tin đăng ký của bạn</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Tên người dùng</label>
            <div className="input-container">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Tên người dùng"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className="input-container">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="auth-button">Đăng ký</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
