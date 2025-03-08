import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
    </div>
  );
};

export default LoginPage;
