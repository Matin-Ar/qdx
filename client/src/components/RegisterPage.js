import React, { Component } from "react";
import { connect } from "react-redux";
import { starUserRegister } from "../Actions/user";
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

    // dipatching start User Register process
    const registerResult = this.props.dispatch(starUserRegister(user));
    registerResult.then((res, rej) => {
      if (res === "ثبت نام موفق") {
        setTimeout(() => {
          this.props.history.push("/dashboard");
        }, 3000);
      }
    });
    console.log(registerResult);
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
          persianMsg.push("پسورد شما ضعیف می باشد");
        }
        if (item === "email") {
          persianMsg.push("ایمیل وارد شده تکراری می باشد");
        }
        if (item === "number") {
          persianMsg.push("شماره وارد شده تکراری می باشد");
        }
      });
    }

    // console.log(massage);
    // console.log(persianMsg);
    console.log(persianMsg);
    // console.log(this.props.registerErrorMsg[0]);
  }

  //   return this.props.registerErrorMsg;

  // this.props.registerErrorMsg.forEach((error) => {
  //   if (error[0] === "number") {
  //     massage.push("شماره همراه قبلا ثبت شده است");
  //   } else if (error[0] === "email") {
  //     massage.push("ایمیل قبلا ثبت شده است");
  //   } else {
  //     console.log("this is a new register error", error[0]);
  //   }

  //   //   return massage;
  //   // });
  // }

  render() {
    return (
      <div>
        <div className="register-wrapper">
          <form className="register-form" onSubmit={this.handleRegister}>
            {this.props.registersuccessMsg && (
              <div className="registerSuccess-container">
                {this.props.registersuccessMsg}
              </div>
            )}

            {this.renderErrorMsg()}

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
    registersuccessMsg:
      state.errorMsg.registersuccessMsg != "registerError"
        ? state.errorMsg.registersuccessMsg
        : "",
  };
};
export default withRouter(connect(mapStateToProps)(RegisterPage));

//   regRes.then(
//     (res) => {
//       if (res === "ثبت نام موفق") {
//         this.props.dispatch(setRegisterSuccess(res));
//         setTimeout(() => {
//           this.props.dispatch(clearAllErrors());
//           this.props.history.push("/dashboard");
//         }, 2000);
//       } else {
//         this.props.dispatch(startSetRegisterError(res));
//       }
//     },
//     (e) => console.log(e)
//   );
// }

// handleErrorMassageText() {
//   if (this.props.registerErrorMsg === "MongoError") {
//     setTimeout(() => {
//       this.props.dispatch(clearRegisterMsg);
//     }, 5000);
//     return <div>کاربر قبلا ثبت نام کرده است </div>;
//   } else if (this.props.registerErrorMsg) {
//     setTimeout(() => {
//       this.props.dispatch(clearRegisterMsg);
//     }, 5000);
//     return <div>{this.props.registerErrorMsg}</div>;
//   }
// }

// {!!this.props.registerErrorMsg && (
//   <div className="registerError-container">
//     {this.props.registerErrorMsg}
//   </div>
// )}
