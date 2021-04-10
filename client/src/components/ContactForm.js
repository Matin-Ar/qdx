import React from "react";

export default function ContactForm() {
  return (
    <div className="contactusform-wrapper">
      <form className="contactusform">
        <label htmlFor="name">
          نام و نام‌ خانوادگی{" "}
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="متین عراقی"
            ></input>
          </div>
        </label>

        <label htmlFor="email">
          ایمیل{" "}
          <input
            type="text"
            name="email"
            id="email"
            placeholder="matin@is.noob"
          ></input>
        </label>

        <label htmlFor="phonenumber">
          موبایل{" "}
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            placeholder="0918000000"
          ></input>
        </label>

        <label htmlFor="desc">
          توضیحات{" "}
          <input
            type="text"
            name="desc"
            id="constactus-desc"
            placeholder="توضیحات خود را وارد نمایید"
          ></input>
        </label>

        <label htmlFor="desc">
          آپلود فایل
          <input type="file" name="files" id="contactus-files"></input>
        </label>

        <button type="submit">ارسال پیام</button>
      </form>
    </div>
  );
}
