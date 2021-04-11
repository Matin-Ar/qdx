import React from "react";
import { connect } from "react-redux";
import { startUserLogIn } from "../Actions/user";

function LoginPage(props) {
  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: e.target.loginEmail.value,
      password: e.target.loginPassword.value,
    };

    props.dispatch(startUserLogIn(user));
  };
  return (
    <div className="loginPage-wrapper">
      <form className="login-wrapper" onSubmit={handleLogin}>
        <p>ورود</p>
        <label htmlFor="loginEmail">ایمیل</label>
        <input type="text" name="loginEmail" />

        <label htmlFor="loginPassword">پسورد</label>
        <input type="password" name="loginPassword" />
        <button type="submit" className="loginButton">
          ورود
        </button>
      </form>
    </div>
  );
}

export default connect()(LoginPage);
