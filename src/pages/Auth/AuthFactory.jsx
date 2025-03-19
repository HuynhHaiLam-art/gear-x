import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Import file CSS mới

// Danh sách tài khoản giả
const fakeUsers = [
  { email: "admin@example.com", password: "admin123", role: "admin" },
  { email: "user@example.com", password: "user123", role: "user" },
];

const AuthFactory = ({ type, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "login") {
      const foundUser = fakeUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        if (foundUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("Sai email hoặc mật khẩu!");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{type === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
        <form onSubmit={handleSubmit}>
          {type === "register" && <input type="text" placeholder="Họ và Tên" />}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          {type === "register" && <input type="password" placeholder="Xác nhận mật khẩu" />}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="auth-button" type="submit">
            {type === "login" ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>
        <p>
          {type === "login" ? (
            <>
              Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </>
          ) : (
            <>
              Đã có tài khoản? <a href="/login">Đăng nhập</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthFactory;
