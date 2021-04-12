import React, { Component } from "react";
import { connect } from "react-redux";
import { starUserRegister } from "../Actions/user";
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

    const javab = this.props.dispatch(starUserRegister(user));
    javab.then(
      (res) => {
        if (res === "registerComplete") {
          this.props.history.push("/dashboard");
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
  };
};

export default withRouter(connect(mapStateToProps)(RegisterPage));

// function RegisterPage(props) {
//   const handleRegister = (e) => {
//     e.preventDefault();
//     const user = {
//       name: e.target.registerName.value,
//       lastname: e.target.registersureName.value,
//       number: e.target.phoneNumber.value,
//       email: e.target.registerEmail.value,
//       password: e.target.registerPassword.value,
//     };

//     props.dispatch(starUserRegister(user));
//   };
//   console.log(props);

//   return (
//     <div className="register-wrapper">
//       <form className="register-form" onSubmit={handleRegister}>
//         {props.registerErrorMsg && (
//           <div className="registerError-container"></div>
//         )}
//         <p>ثبت نام</p>
//         <label htmlFor="registerName">نام</label>
//         <input type="text" name="registerName" required />
//         <label htmlFor="registersureName">نام خانوادگی </label>
//         <input type="text" name="registersureName" required />

//         <label htmlFor="phoneNumber">شماره همراه</label>
//         <input type="number" name="phoneNumber" required />

//         <label htmlFor="registerEmail">ایمیل</label>
//         <input type="email" name="registerEmail" required />

//         <label htmlFor="registerPassword">پسورد</label>
//         <input type="password" name="registerPassword" required />

//         <button type="submit" className="registerButton">
//           ثبت نام
//         </button>
//       </form>
//     </div>
//   );
// }
// const mapStateToProps = (state) => {
//   return {
//     registerErrorMsg: state.registerErrorMsg,
//   };
// };

// export default connect(mapStateToProps)(RegisterPage);
