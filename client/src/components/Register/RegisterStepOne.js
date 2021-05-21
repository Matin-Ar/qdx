import axios from "axios";
import React, { useState, useRef } from "react";
import RegisterIMG from "../../assets/register/register.svg";
import VerificationIMG from "../../assets/register/verification.svg";
import { connect } from "react-redux";
import { starUserRegister } from "../../Actions/user";
import NameIMG from "../../assets/register/user.svg";
import RegisterLoader from "./RegisterLoader";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import validator from "validator";

function RegisterStepOne({ dispatch }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStreangth] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isLoadFinished, setIsLoadFinished] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [barColor, setBarColor] = useState("red");
  const [phoneErr, setPhoneErr] = useState("");
  const [isValidmobile, setIsValidmobile] = useState(false);
  const [isValidMail, setIsValidMail] = useState(false);
  const [isStrPass, setIsStrPass] = useState(0);
  const [step, setStep] = useState(1);
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");
  const [input4, setinput4] = useState("");
  const [verificationBtnIsDisabled, setVerificationBtnIsDisabled] =
    useState(false);

  const [phoneErrColor, setPhoneColor] = useState("red");
  const [validEmailErr, setValidEmailErr] = useState("");
  const [validEmailColor, setValidEmailColor] = useState("red");

  const validatePass = (e) => {
    setPasswordStreangth(null);

    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: true,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 20,
    });
    console.log("score is", isStrongPassword);
    setBarWidth(isStrongPassword * 10);

    if (isStrongPassword / 10 < 2) {
      setPasswordStreangth("ضعیف");
      setBarColor("red");
    } else if (isStrongPassword / 10 < 2.5) {
      setPasswordStreangth("متوسط");
      setBarColor("yellow");
    } else if (isStrongPassword / 10 > 4) {
      setBarColor("lightgreen");
      setPasswordStreangth("قوی");
    } else if (isStrongPassword / 10 > 5) {
      setBarColor("black");
      setPasswordStreangth("خیلی قوی");
    }

    setPassword(e.target.value);
    setIsStrPass(isStrongPassword);
  };

  const validatePhone = (e) => {
    setPhoneErr("");
    const isValidPhone = validator.isMobilePhone(e.target.value, ["fa-IR"]);
    if (!isValidPhone) {
      setIsValidmobile(false);

      setPhoneErr("لطما شماره همراه معتبری وارد نمایید");
    } else {
      setPhoneColor("green");
      setIsValidmobile(true);

      setPhoneErr("شماره همراه معتبر می باشد");
    }
    console.log(isValidPhone);
    setNumber(e.target.value);
  };

  const validEmail = (e) => {
    setValidEmailErr("");
    const isValidEmail = validator.isEmail(email);

    if (!isValidEmail) {
      setValidEmailErr("لطفا یک ایمیل معتبر وارد نمایید");
      setValidEmailColor("red");
      setIsValidMail(false);
    } else {
      setValidEmailErr("معتبر می باشد");
      setValidEmailColor("green");
      setIsValidMail(true);
    }

    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    let newArr = [];
    setErrors(newArr);

    if (name.length < 3) {
      newArr.push("لطفا نام حقیقی خود را وارد نمایید");
    }

    if (surname.length < 3) {
      newArr.push("لطفا نام خانوادگی حقیقی وارد نمایید");
    }

    if (number.length !== 11 || !isValidmobile) {
      newArr.push("لطفا شماره موبایل خود را مجدد بررسی نمایید");
    }

    if (!email || !isValidMail) {
      newArr.push("لطفا ایمیل خود را مجدد بررسی نمایید");
    }

    if (!password || isStrPass / 10 < 4) {
      newArr.push("لطفا رمز عبور قوی تری انتخاب نمایید");
    }
    setErrors(newArr);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);

    if (
      name.length > 3 &&
      surname.length > 3 &&
      isStrPass / 10 > 3 &&
      isValidMail &&
      isValidmobile
    ) {
      setErrors([]);
      axios
        .post("/activation/sendcode", { number, email })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            console.log(res.data);
            setStep(2);
          } else {
            setTimeout(() => {
              setIsDisabled(false);
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
          const text = err.response.data.error.split(",");
          setErrors([...text]);
          setTimeout(() => {
            setIsDisabled(false);
          }, 3000);
        });
    }
  };

  const handlePhoneVerification = async (e) => {
    e.preventDefault();
    setVerificationBtnIsDisabled(true);
    setIsLoad(true);
    const code = "" + input1 + input2 + input3 + input4;

    const signupRes = await dispatch(
      starUserRegister({
        code,
        number,
        name,
        lastname: surname,
        email,
        password,
      })
    );

    if (signupRes === "ثبت نام موفق") {
      setTimeout(() => {
        setIsLoadFinished(true);
      }, 6000);
      setTimeout(() => {
        setIsLoad(false);
      }, 8000);
    } else {
      setIsLoad(false);
      setErrors((prevErr) => [...prevErr, signupRes]);
      setTimeout(() => {
        setVerificationBtnIsDisabled(false);
      }, 2000);
    }
  };

  return (
    <div className="register_tab_wrapper">
      <div className="register_tab_container">
        {isLoad && <RegisterLoader isLoadFinished={isLoadFinished} />}

        <div className="register_hero">
          <div className="register-svg-container">
            <img
              className="register_svg"
              src={step === 1 ? RegisterIMG : VerificationIMG}
              width="80%"
              height="80%"
            ></img>
          </div>
        </div>
        <div className="register_form_container">
          <h1 className="register_title">
            به خانواده چند هزار نفری QDX بپیوندید
          </h1>
          <p className="register_subtitle">
            QDX مرجعی برای دانلود رایگان آموزش های برنامه نویسی Front End و Back
            End{" "}
          </p>

          {errors.length > 0 && (
            <div className="registerError-container">
              {errors.map((err) => {
                return <li>{err}</li>;
              })}
            </div>
          )}

          {step === 1 && (
            <form
              autoComplete="off"
              className="new_register_form"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <input type="hidden" value="prayer" />

              <label htmlFor="newregistersureName">نام </label>
              <input
                type="text"
                name="newregistersureName"
                className="newsurename"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="newregistersureName">نام خانوادگی </label>
              <input
                type="text"
                name="newregistersureName"
                className="newsurename"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <label htmlFor="newphoneNumber">
                شماره همراه{" "}
                <span style={{ color: phoneErrColor, fontSize: 12 }}>
                  {phoneErr}
                </span>
              </label>
              <input
                type="number"
                name="newphoneNumber"
                value={number}
                onChange={validatePhone}
                required
                className="newphonenumber"
              />
              <label htmlFor="newregisterEmail">
                ایمیل{" "}
                <span style={{ color: validEmailColor }}>{validEmailErr}</span>
              </label>
              <input
                type="email"
                name="newregisterEmail"
                value={email}
                onChange={validEmail}
                className="newemail"
                required
              />
              <label htmlFor="newregisterPassword">پسورد</label>
              <input
                type="password"
                value={password}
                onChange={(e) => validatePass(e)}
                name="newregisterPassword"
                required
                className="newpassword"
              />
              {password && (
                <p>
                  قدرت رمز عبور :{" "}
                  <span style={{ fontSize: 10, color: "red" }}>
                    {" "}
                    {passwordStrength}
                  </span>
                </p>
              )}

              {password && (
                <div
                  className="bar"
                  style={{
                    marginTop: "1em",
                    height: 5,
                    width: barWidth,
                    maxWidth: 600,
                    backgroundColor: barColor,
                  }}
                ></div>
              )}

              <button
                type="submit"
                name="registerBtn"
                className="registerButton"
                disabled={isDisabled}
              >
                ثبت نام
              </button>
              <p style={{ marginTop: "1em", textAlign: "center" }}>
                قبلا عضو شدید؟{" "}
                <Link to="/login">
                  {" "}
                  <span style={{ color: "#ffc000" }}>وارد شوید</span>
                </Link>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={(e) => handlePhoneVerification(e)}>
              <p>
                {" "}
                کد تایید به شماره {number} پیامک شد.{" "}
                <span
                  style={{ color: "#ffc000", cursor: "pointer" }}
                  onClick={(e) => setStep(1)}
                >
                  تغییر شماره
                </span>{" "}
              </p>
              <div className="phoneverification_input_container">
                <input
                  className="phoneverification_input"
                  type="text"
                  required
                  min="1"
                  step="1"
                  pattern="[0-9]"
                  maxlength="1"
                  max="9"
                  value={input1}
                  onChange={(e) => setinput1(e.target.value)}
                />
                <input
                  className="phoneverification_input"
                  type="text"
                  required
                  min="0"
                  pattern="[0-9]"
                  max="9"
                  maxlength="1"
                  value={input2}
                  onChange={(e) => setinput2(e.target.value)}
                  step="1"
                />
                <input
                  className="phoneverification_input"
                  type="text"
                  required
                  min="0"
                  pattern="[0-9]"
                  maxlength="1"
                  max="9"
                  step="1"
                  value={input3}
                  onChange={(e) => setinput3(e.target.value)}
                />
                <input
                  className="phoneverification_input"
                  type="text"
                  required
                  step="1"
                  maxLength="1"
                  pattern="[0-9]"
                  min="0"
                  max="9"
                  value={input4}
                  onChange={(e) => setinput4(e.target.value)}
                />
              </div>
              <button
                className="registerButton"
                disabled={verificationBtnIsDisabled}
              >
                تایید و ادامه
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect()(RegisterStepOne));

// {<div className="registerSuccess-container">
// <svg
//   class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
//   focusable="false"
//   viewBox="0 0 24 24"
//   aria-hidden="true"
// >
//   <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
// </svg>
// </div>

// <div className="registerError-container"></div>}
