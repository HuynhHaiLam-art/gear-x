import React from "react";
import AuthFactory from "./AuthFactory";

const LoginPage = ({ setUser }) => {
  return <AuthFactory type="login" setUser={setUser} />;
};

export default LoginPage;
