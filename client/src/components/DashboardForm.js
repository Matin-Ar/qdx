import React, { useState, useReducer } from "react";
import { connect } from "react-redux";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import SexSelect from "./SexSelect";
import axios from "axios";
import { withRouter } from "react-router";
export function DashboardForm({
  handleModleOpen,
  firstName,
  lastName,
  phoneNumber,
  age,
  gender,
  id,
  email,
  userAvatar,
  history,
}) {
  const [selectedDay, setSelectedDay] = useState(null);

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

  return (
    <form autocomplete="off">
      <h1 className="dashboard-header-text">ویرایش حساب کاربری</h1>
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
          <SexSelect />

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
            disabled
            placeholder="غیر فعال است"
          />

          <label htmlFor="dashboardCodingLanguage">
            زبان برنامه نویسی مورد علاقه
          </label>
          <input
            type="text"
            name="dashboardCodingLanguage"
            autocomplete="false"
            disabled
            placeholder="غیر فعال است"
          />
        </div>
        <div className="right-user-info">
          <label htmlFor="dashboardName">نام</label>
          <input
            type="text"
            name="dashboardName"
            autocomplete="false"
            value={firstName}
          />
          <label htmlFor="dashboardLastName">نام خانوادگی </label>
          <input
            type="text"
            name="dashboardLastName"
            autocomplete="false"
            value={lastName}
          />

          <label htmlFor="phoneNumber">شماره همراه</label>
          <input
            type="number"
            name="phoneNumber"
            autocomplete="false"
            value={phoneNumber}
          />

          <label htmlFor="dashboardEmail">ایمیل</label>
          <input
            type="email"
            name="dashboardEmail"
            autocomplete="false"
            value={email}
          />
        </div>
      </div>
      <div className="dashboard-button-wrapper">
        <button className="dashboard-button-update">بروزرسانی</button>
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
    age: state.user.age ? state.user.age : null,
    phoneNumber: state.user.number
      ? state.user.number
      : "شماره موبایل خود را وارد نمایید",
    email: state.user.email ? state.user.email : "ایمیل خود را وارد نمایید",
    gender: state.user.gender ? state.user.gender : null,
    userAvatar: state.user.avatar,
  };
};

export default withRouter(connect(mapStateToProps)(DashboardForm));
