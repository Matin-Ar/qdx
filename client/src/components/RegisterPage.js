import React, { Component } from "react";
import { connect } from "react-redux";
import { starUserRegister } from "../Actions/user";
import exclamation from "../assets/exclamation.png";
import {
  setRegisterSuccess,
  clearAllErrors,
  clearRegisterMsg,
  startSetRegisterError,
} from "../Actions/errors";
import { withRouter } from "react-router-dom";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.renderErrorMsg = this.renderErrorMsg.bind(this);

    this.state = {
      persianMsg: "",
    };
  }

  handleRegister(e) {
    //preventing defaults and clearing All Register relative error
    e.preventDefault();
    this.props.dispatch(clearRegisterMsg());

    //getting the input field data
    const user = {
      name: e.target.registerName.value,
      lastname: e.target.registersureName.value,
      number: e.target.phoneNumber.value,
      email: e.target.registerEmail.value,
      password: e.target.registerPassword.value,
    };

    e.target.registerBtn.disabled = true;

    setTimeout(() => {
      e.target.registerBtn.disabled = false;
    }, 5000);

    // dipatching start User Register process
    const registerResult = this.props.dispatch(starUserRegister(user));
    registerResult.then((res, rej) => {
      if (res === "ثبت نام موفق") {
        setTimeout(() => {
          this.props.history.push("/");
        }, 5000);
      }
    });
  }

  renderErrorMsg() {
    const massage = [];
    const persianMsg = [];

    if (this.props.registerErrorMsg) {
      this.props.registerErrorMsg.map((error) => {
        massage.push(error[0]);
      });
    }

    if (massage) {
      massage.map((item) => {
        if (item === "password") {
          persianMsg.push(
            "رمر عبور باید شامل حداقل 1 حرف کوچک ، 1 حرف بزرگ و  1 عدد باشد"
          );
        }
        if (item === "email") {
          persianMsg.push("ایمیل وارد شده قبلا ثبت شده است");
        }
        if (item === "number") {
          persianMsg.push("شماره همراه قبلا ثبت شده است");
        }
      });
    }

    const finalMassage = persianMsg.map((error) => (
      <p className="error-text-container">
        <svg
          class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
        </svg>
        {error}
      </p>
    ));
    return finalMassage;
  }

  render() {
    return (
      <div>
        <div className="register-wrapper">
          <form className="register-form" onSubmit={this.handleRegister}>
            {this.props.registersuccessMsg && (
              <div className="registerSuccess-container">
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
                </svg>
                {this.props.registersuccessMsg}
              </div>
            )}

            {this.props.isError && (
              <div className="registerError-container">
                {this.renderErrorMsg()}{" "}
              </div>
            )}

            <p>ثبت نام</p>
            <label htmlFor="registerName">نام</label>
            <input type="text" name="registerName" required />
            <label htmlFor="registersureName">نام خانوادگی </label>
            <input type="text" name="registersureName" required />

            <label htmlFor="phoneNumber">شماره همراه</label>
            <input type="number" name="phoneNumber" required />

            <label htmlFor="registerEmail">ایمیل</label>
            <input type="email" name="registerEmail" required />

            <label htmlFor="registerPassword">پسورد</label>
            <input type="password" name="registerPassword" required />

            <button type="submit" name="registerBtn" className="registerButton">
              ثبت نام
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registerErrorMsg: state.errorMsg.registerErrorMsg,
    isError: state.errorMsg.registerErrorMsg.length > 0 ? true : false,

    registersuccessMsg:
      state.errorMsg.registersuccessMsg != "registerError"
        ? state.errorMsg.registersuccessMsg
        : "",
  };
};
export default withRouter(connect(mapStateToProps)(RegisterPage));
