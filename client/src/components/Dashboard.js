import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import AvatarMaker from "./AvatarMaker";
import ReactModal from "react-modal";
import DefaultAvatar from "../assets/DefaultAvatar.jpg";

export default function Dashboard() {
  const now = utils("fa").getToday();
  const defaultValue = {
    year: now.year,
    month: now.month,
    day: now.day,
  };

  const minimumDate = {
    year: 1300,
    month: 1,
    day: 1,
  };

  const maximumDate = {
    year: 1450,
    month: 1,
    day: 1,
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  return (
    <div className="dashboard-Container">
      <div className="dashboard-content-wrapper">
        <form autocomplete="off">
          <h1 className="dashboard-header-text">ویرایش حساب کاربری</h1>
          <div className="dashboard-avatar-container">
            <img
              className="dashboard-avatar-img"
              src={DefaultAvatar}
              onClick={() => setModalIsOpen(true)}
            />
            <div className="avatar-overLay"></div>
          </div>
          <div className="user-info-wrapper">
            <div className="right-user-info">
              <label htmlFor="registerName">نام</label>
              <input type="text" name="registerName" autocomplete="false" />
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

              <label htmlFor="phoneNumber">شماره همراه</label>
              <input type="number" name="phoneNumber" autocomplete="false" />

              <label htmlFor="registerEmail">ایمیل</label>
              <input type="email" name="registerEmail" autocomplete="false" />
            </div>
            <div className="left-user-info">
              <label htmlFor="registerName">نام</label>
              <input type="text" name="registerName" autocomplete="false" />
              <label htmlFor="registersureName">نام خانوادگی </label>
              <input type="text" name="registersureName" autocomplete="false" />

              <label htmlFor="phoneNumber">شماره همراه</label>
              <input type="number" name="phoneNumber" autocomplete="false" />

              <label htmlFor="registerEmail">ایمیل</label>
              <input type="email" name="registerEmail" autocomplete="false" />
            </div>
          </div>
          <div className="dashboard-button-wrapper">
            <button className="dashboard-button-update">بروزرسانی</button>
            <button className="dashboard-button-delete">حذف پروفایل</button>
          </div>
        </form>

        <ReactModal
          isOpen={
            modalIsOpen
            /* Boolean describing if the modal should be shown or not. */
          }
          onRequestClose={() => setModalIsOpen(false)}
        >
          <AvatarMaker></AvatarMaker>
        </ReactModal>
      </div>
    </div>
  );
}
