import React, { useState } from "react";

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
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterForm;
