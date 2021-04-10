import React from "react";

function LoginPage() {
  return (
    <div className="loginPage-wrapper">
      <div className="register-wrapper">
        <form className="register-form">
          <p>ثبت نام</p>

          <label htmlFor="registerName">نام و نام خانوادگی </label>
          <input type="text" name="registerName" />

          <label htmlFor="registerEmail">ایمیل</label>
          <input type="email" name="registerEmail" />

          <label htmlFor="loginEmail">پسورد</label>
          <input type="password" name="loginEmail" />

          <label htmlFor="loginEmail">تایید پسورد</label>
          <input type="password" name="loginEmail" />
          <button type="submit" className="registerButton">
            ثبت نام
          </button>
        </form>
      </div>
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
