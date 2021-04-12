import React, { Component } from "react";
import { connect } from "react-redux";
import { starUserRegister } from "../Actions/user";
import { setRegisterSuccess, clearAllErrors } from "../Actions/errors";
import { withRouter } from "react-router-dom";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    const user = {
      name: e.target.registerName.value,
      lastname: e.target.registersureName.value,
      number: e.target.phoneNumber.value,
      email: e.target.registerEmail.value,
      password: e.target.registerPassword.value,
    };

    const regRes = this.props.dispatch(starUserRegister(user));
    regRes.then(
      (res) => {
        console.log("register is ", res);
        this.props.dispatch(setRegisterSuccess(res));
        if (res === "ثبت نام موفق") {
          setTimeout(() => {
            this.props.dispatch(clearAllErrors());
            this.props.history.push("/dashboard");
          }, 10000);
        }
      },
      (e) => console.log(e)
    );
  }

  handleErrorMassageText() {
    if (this.props.registerErrorMsg === "MongoError") {
      return <div>کاربر قبلا ثبت نام کرده است </div>;
    } else if (this.props.registerErrorMsg) {
      return <div>{this.props.registerErrorMsg}</div>;
    }
  }

  render() {
    return (
      <div>
        <div className="register-wrapper">
          <form className="register-form" onSubmit={this.handleRegister}>
            {this.props.registerErrorMsg && (
              <div className="registerError-container">
                {this.handleErrorMassageText()}
              </div>
            )}

            {this.props.registersuccessMsg && (
              <div className="registerSuccess-container">
                {this.props.registersuccessMsg}
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

            <button type="submit" className="registerButton">
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
    registersuccessMsg: state.errorMsg.registersuccessMsg,
  };
};

export default withRouter(connect(mapStateToProps)(RegisterPage));
