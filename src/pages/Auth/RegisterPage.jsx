import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <h2>Đăng ký</h2>
      <form>
        <input type="text" placeholder="Họ và Tên" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mật khẩu" required />
        <input type="password" placeholder="Xác nhận mật khẩu" required />
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </div>
  );
};

export default RegisterPage;
