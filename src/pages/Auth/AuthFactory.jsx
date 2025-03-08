import React from "react";
import "./Auth.css"; // Import file CSS mới

const AuthFactory = ({ type }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{type === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
        {type === "register" && <input type="text" placeholder="Họ và Tên" />}
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mật khẩu" />
        {type === "register" && <input type="password" placeholder="Xác nhận mật khẩu" />}
        <button className="auth-button">
          {type === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
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
