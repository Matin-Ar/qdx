import React, { useState, useReducer } from "react";
import { connect } from "react-redux";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import SexSelect from "./SexSelect";
import axios from "axios";
import { SetCurrentUser } from "../Actions/user";
import { withRouter } from "react-router";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export function DashboardForm({
  dispatch,
  handleModleOpen,
  firstName,
  lastName,
  phoneNumber,
  usergender,
  email,
  userAvatar,
  history,
  usereducation,
  usercodinglanguage,
  bday,
}) {
  const formatedBdy = JSON.parse(bday);
  const [selectedDay, setSelectedDay] = useState(formatedBdy);
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formPhoneNumber, setFormPhoneNumber] = useState(phoneNumber);
  // const [formAge, setFormAge] = useState(age);
  const [formGender, setFormGender] = useState(usergender);
  const [formEmail, setFormEmail] = useState(email);
  const [codinglanguage, setCodinglanguage] = useState(usercodinglanguage);
  const [education, setEducation] = useState(usereducation);

  const now = utils("fa").getToday();

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
        console.log("this res is from server after update", res.data);
        console.log("form gender is : ", formGender);
        alertify.success("عملیات بروزرسانی با موفقیت انجام شد");
        dispatch(SetCurrentUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form autocomplete="off">
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
          <SexSelect setFormGender={setFormGender} gender={usergender} />

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
            autocomplete="false"
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
            autocomplete="false"
            placeholder="برای مثال Nodejs,React"
            onChange={(e) => setCodinglanguage(e.target.value)}
          />
        </div>
        <div className="right-user-info">
          <label htmlFor="dashboardName">نام</label>
          <input
            type="text"
            name="dashboardName"
            autocomplete="false"
            value={formFirstName}
            onChange={(e) => setFormFirstName(e.target.value)}
          />
          <label htmlFor="dashboardLastName">نام خانوادگی </label>
          <input
            type="text"
            name="dashboardLastName"
            autocomplete="false"
            value={formLastName}
            onChange={(e) => setFormLastName(e.target.value)}
          />

          <label htmlFor="phoneNumber">شماره همراه</label>
          <input
            type="number"
            name="phoneNumber"
            disabled
            autocomplete="false"
            value={phoneNumber}
          />

          <label htmlFor="dashboardEmail">ایمیل</label>
          <input
            type="email"
            disabled
            name="dashboardEmail"
            autocomplete="false"
            value={email}
          />
        </div>
      </div>
      <div className="dashboard-button-wrapper">
        <button className="dashboard-button-update" onClick={handleUpdateUser}>
          بروزرسانی
        </button>
        <button className="dashboard-button-delete" onClick={handleDeleteUser}>
          حذف پروفایل
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.name ? state.user.name : "نام",
    lastName: state.user.lastname ? state.user.lastname : "نام خانواگی",
    age: state.user.bday ? state.user.bday : null,
    phoneNumber: state.user.number
      ? state.user.number
      : "شماره موبایل خود را وارد نمایید",
    email: state.user.email ? state.user.email : "ایمیل خود را وارد نمایید",
    gender: state.user.gender ? state.user.gender : "agender",
    userAvatar: state.user.avatar,
    usereducation: state.user.education,
    usercodinglanguage: state.user.codinglanguage,
    usergender: state.user.gender,
    bday: state.user.bday,
  };
};

export default withRouter(connect(mapStateToProps)(DashboardForm));
