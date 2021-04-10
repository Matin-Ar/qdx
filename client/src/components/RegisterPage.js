import React from "react";

function RegisterPage() {
  return (
    <div className="register-wrapper">
      <form className="register-form">
        <p>ثبت نام</p>

        <label htmlFor="registerName">نام</label>
        <input type="text" name="registerName" />
        <label htmlFor="registersureName">نام خانوادگی </label>
        <input type="text" name="registersureName" />

        <label htmlFor="phoneNumber">شماره همراه</label>
        <input type="email" name="phoneNumber" />

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
  );
}

export default RegisterPage;
