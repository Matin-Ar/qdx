import React from "react";

function LoginPage() {
  return (
    <div className="loginPage-wrapper">
      <div className="login-wrapper">
        <p>ورود</p>
        <label htmlFor="loginEmail">ایمیل</label>
        <input type="text" name="loginEmail" />

        <label htmlFor="loginPassword">پسورد</label>
        <input type="password" name="loginPassword" />
        <button type="submit" className="loginButton">
          ورود
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
