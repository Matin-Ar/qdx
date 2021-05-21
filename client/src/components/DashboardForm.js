import React, { useState, useReducer } from "react";
import { connect } from "react-redux";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import SexSelect from "./SexSelect";
import axios from "axios";
import { SetCurrentUser } from "../Actions/user";
import { withRouter } from "react-router";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import validator from "validator";
import { motion } from "framer-motion";

export function DashboardForm({
  dispatch,
  handleModleOpen,
  firstName,
  lastName,
  phoneNumber,
  userGender,
  email,
  userAvatar,
  history,
  usereducation,
  usercodinglanguage,
  bday,
}) {
  const [selectedDay, setSelectedDay] = useState(
    bday ? JSON.parse(bday) : null
  );
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formPhoneNumber, setFormPhoneNumber] = useState(phoneNumber);
  const [formGender, setFormGender] = useState(userGender);
  const [formEmail, setFormEmail] = useState(email);
  const [codinglanguage, setCodinglanguage] = useState(usercodinglanguage);
  const [education, setEducation] = useState(usereducation);
  const [password, setPassword] = useState("");
  const [barWidth, setBarWidth] = useState(0);
  const [barColor, setBarColor] = useState("red");
  const [passwordStrength, setPasswordStreangth] = useState(null);
  const [passwordStrengthErr, setPasswordStrengthErr] = useState();
  const [code, setCode] = useState("");

  const [isStrPass, setIsStrPass] = useState(0);
  const [changepasswordBtnTxt, setChangepasswordBtnTxt] =
    useState("تغییر رمز عبور");

  const [disableChangePasswordBtn, setDisableChangePasswordBtn] =
    useState(false);

  const [changepasswordReq, setChangepasswordReq] = useState(false);

  const now = utils("fa").getToday();

  console.log("dashboard form gender vale is ", userGender);

  const defaultValue = {
    year: now.year,
    month: now.month,
    day: now.day,
  };

  const minimumDate = {
    year: now.year - 100,
    month: 1,
    day: 1,
  };

  const maximumDate = {
    year: now.year,
    month: now.month,
    day: now.day,
  };

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

    if (isStrongPassword / 10 < 2) {
      setPasswordStreangth("ضعیف");
    } else if (isStrongPassword / 10 < 2.5) {
      setPasswordStreangth("متوسط");
    } else if (isStrongPassword / 10 > 4) {
      setPasswordStreangth("قوی");
    } else if (isStrongPassword / 10 > 5) {
      setPasswordStreangth("خیلی قوی");
    }

    setPassword(e.target.value);
    setIsStrPass(isStrongPassword);
  };
  const handleDeleteUser = (e) => {
    e.preventDefault();
    const promptMsg = prompt(
      "آیا مطمئن هستین ؟ این عملیات غیر قابل بازگشت می باشد | for delete type yes"
    );

    if (promptMsg) {
      console.log(promptMsg);
      if (promptMsg === "yes") {
        axios.delete("/users/me");
        alert("حذف اکانت با موفقیت انجام شد | خدانگهدار");
        history.push("/");
      } else {
        alert("حذف اکانت ناموفق");
      }
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    axios
      .patch("/users/me", {
        name: formFirstName,
        lastname: formLastName,
        gender: formGender,
        bday: JSON.stringify(selectedDay),
        codinglanguage,
        education,
      })
      .then((res) => {
        alertify.success("عملیات بروزرسانی با موفقیت انجام شد");
        dispatch(SetCurrentUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePasswordReq = (e) => {
    setChangepasswordBtnTxt("لطفا صبر نمایید");
    setDisableChangePasswordBtn(true);
    axios.post("/verification/sendcode").then((res) => {
      if (res.status === 200) {
        setChangepasswordReq(true);
      }
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (isStrPass < 30) {
      setPasswordStrengthErr(
        "رمز عبور انتخابی ضعیف است رمز عبور قوی تری وارد نمایید"
      );
    }
    if (isStrPass > 30) {
      axios
        .patch("/users/password", { password, code })
        .then((res) => {
          if (res.status === 200) {
            alertify.success("تغییر رمز عبور با موفقیت انجام شد");
            setChangepasswordReq(false);
            setChangepasswordBtnTxt("  تغییر رمز عبور");
            setDisableChangePasswordBtn(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form autoComplete="off">
      <div className="dashboard-avatar-container">
        <img
          className="dashboard-avatar-img"
          src={userAvatar}
          onClick={handleModleOpen}
        />
        <div className="avatar-overLay"></div>
      </div>
      <div className="user-info-wrapper">
        <div className="left-user-info">
          <label htmlFor="dashboard-sex-info">جنسیت</label>
          <SexSelect setFormGender={setFormGender} genderProp={userGender} />

          <label htmlFor="registersureName">تاریح تولد </label>
          <div>
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder="یک روز را انتخاب نمایید"
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              locale="fa" // add this
            />
          </div>

          <label htmlFor="dashboardEducation">رشته تحصیلی</label>
          <input
            type="text"
            name="dashboardEducation"
            autoComplete="false"
            value={education}
            onChange={(e) => {
              setEducation(e.target.value);
            }}
            placeholder="مقطع و رشته تحصیلی خود را وارد نمایید"
          />

          <label htmlFor="dashboardCodingLanguage">
            زبان برنامه نویسی مورد علاقه
          </label>
          <input
            type="text"
            name="dashboardCodingLanguage"
            value={codinglanguage}
            autoComplete="false"
            placeholder="برای مثال Nodejs,React"
            onChange={(e) => setCodinglanguage(e.target.value)}
          />
        </div>
        <div className="right-user-info">
          <label htmlFor="dashboardName">نام</label>
          <input
            type="text"
            name="dashboardName"
            autoComplete="false"
            value={formFirstName}
            onChange={(e) => setFormFirstName(e.target.value)}
          />
          <label htmlFor="dashboardLastName">نام خانوادگی </label>
          <input
            type="text"
            name="dashboardLastName"
            autoComplete="false"
            value={formLastName}
            onChange={(e) => setFormLastName(e.target.value)}
          />

          <label htmlFor="phoneNumber">شماره همراه</label>
          <input
            type="number"
            name="phoneNumber"
            disabled
            autoComplete="false"
            value={phoneNumber}
          />

          <label htmlFor="dashboardEmail">ایمیل</label>
          <input
            type="email"
            disabled
            name="dashboardEmail"
            autoComplete="false"
            value={email}
          />
        </div>
      </div>
      <div className="dashboard-button-wrapper">
        <div>
          <button
            className="dashboard-button-change-password"
            disabled={disableChangePasswordBtn}
            style={{
              display: changepasswordReq === true ? "none" : "inline-block",
            }}
            onClick={(e) => handleChangePasswordReq(e)}
          >
            {changepasswordBtnTxt}
          </button>
          <div
            style={{
              display: changepasswordReq === true ? "inline-block" : "none",
            }}
          >
            <motion.input
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              type="text"
              className="change-password-input"
              placeholder="رمز عبور جدید را وارد نمایید"
              value={password}
              onChange={(e) => validatePass(e)}
            ></motion.input>

            <motion.input
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="change-password-verification-code"
              type="text"
              required
              min="0"
              maxlength="4"
              step="1"
              placeholder="کد تایید را وارد نمایید"
            />

            <motion.button
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              className="dashboard-button-change-password"
              onClick={handleUpdatePassword}
            >
              ارسال رمز عبور جدید
            </motion.button>

            <span style={{ fontSize: 14, color: "red" }}>
              {passwordStrengthErr}
            </span>
          </div>
        </div>
        <div>
          <button
            className="dashboard-button-update"
            onClick={handleUpdateUser}
          >
            بروزرسانی
          </button>

          <button
            className="dashboard-button-delete"
            onClick={handleDeleteUser}
          >
            حذف پروفایل
          </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.name ? state.user.name : "نام",
    lastName: state.user.lastname ? state.user.lastname : "نام خانواگی",
    phoneNumber: state.user.number
      ? state.user.number
      : "شماره موبایل خود را وارد نمایید",
    email: state.user.email ? state.user.email : "ایمیل خود را وارد نمایید",
    gender: state.user.gender ? state.user.gender : "agender",
    userAvatar: state.user.avatar,
    usereducation: state.user.education,
    usercodinglanguage: state.user.codinglanguage,
    userGender: state.user.gender,
    bday: state.user.bday,
  };
};

export default withRouter(connect(mapStateToProps)(DashboardForm));
