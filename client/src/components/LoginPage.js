import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startUserLogIn } from "../Actions/user";
import {
  clearAllErrors,
  setLoginErrorMsg,
  clearLoginErrorMsg,
  setLoginSuccessMsg,
} from "../Actions/errors";

function LoginPage(props) {
  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: e.target.loginEmail.value,
      password: e.target.loginPassword.value,
    };

    e.target.loginButton.disabled = true;

    setTimeout(() => {
      e.target.loginButton.disabled = false;
    }, 3000);

    const signInRes = props.dispatch(startUserLogIn(user));
    signInRes.then(
      (res) => {
        console.log("result response is", res);
        if (res.status === 200) {
          // setTimeout(() => {
          //   // props.dispatch(clearAllErrors());
          //   props.history.push("/dashboard");
          // }, 10000);
        } else {
          props.dispatch(setLoginErrorMsg(res));
          setTimeout(() => {
            props.dispatch(clearLoginErrorMsg());
          }, 5000);
        }
      },
      (e) => {}
    );
  };

  return (
    <div className="loginPage-wrapper">
      <form className="login-wrapper" onSubmit={handleLogin}>
        {props.isLoginSuccess && (
          <div className="loginSuccess-container">{props.loginSuccess}</div>
        )}

        {props.loginError && (
          <div className="loginError-container">{props.loginError}</div>
        )}

        <p>ورود</p>
        <label htmlFor="loginEmail">ایمیل</label>
        <input type="text" name="loginEmail" required />

        <label htmlFor="loginPassword">پسورد</label>
        <input type="password" name="loginPassword" required />
        <button type="submit" className="loginButton" name="loginButton">
          ورود
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: !!state.errorMsg.loginSuccess,
    loginSuccess: state.errorMsg.loginSuccess,
    loginError: state.errorMsg.loginError,
    name: state.user.name,
  };
};

export default withRouter(connect(mapStateToProps)(LoginPage));
