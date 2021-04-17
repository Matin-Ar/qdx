import React, { Component } from "react";

import dummyCourseImg from "../assets/courses/courseimage/lodash.png";
import Social from "./Social";
import SingleCourseTab from "./SingleCourseTab";

import durationICON from "../assets/courses/duration.png";
import authorICON from "../assets/courses/author.png";
import languageICON from "../assets/courses/language.png";
import lessonsICON from "../assets/courses/lessons.png";
import linkICON from "../assets/courses/link.png";

export default class SingleCoursePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="singleCousePage-wrapper">
        <div className="singleCourse-container">
          <div className="imageContainer">
            <img src={dummyCourseImg} />
          </div>
          <div className="courseShortDescription-container">
            <h1>Course Title</h1>
            <p>
              Subnautica Below Zero یک بازی جهان باز ( Open World ) و تک نفره می
              باشد که توسط استودیو Unknown Worlds Entertainment ساخته و در تاریخ
              30 ژانویه 2019 منتشر شد . شما در یک اقیانوس فضایی هستید که می
              توانید مناطق مختلف بازی در زیر دریا و روی خشکی را جستجو کنید .
              Below Zero
            </p>
            <div className="infoIcon-container">
              <div className="infoIcon-top">
                <div className="singlecourse-description-bottom-icons">
                  <div className="singlecourse-description-bottom-icon">
                    <img src={durationICON}></img>
                    <p>03:54:21</p>
                  </div>
                  <div className="singlecourse-description-top-icon">
                    <img src={lessonsICON}></img>
                    <p>42</p>
                  </div>
                  <div className="singlecourse-description-top-icon">
                    <img src={languageICON}></img>
                    <p>انگلیسی </p>
                  </div>
                  <div className="singlecourse-description-top-icon">
                    <img src={linkICON}></img>
                    <p>Udemy.com</p>
                  </div>
                  <div className="singlecourse-description-top-icon">
                    <img src={authorICON}></img>
                    <p>Andrew Mead</p>
                  </div>
                </div>
              </div>
              <div className="infoIcon-bottom">
                <div className="singlecourse-description-bottom-icons">
                  <div className="singlecourse-description-bottom-icon">
                    <img src={durationICON}></img>
                    <p>03:54:21</p>
                  </div>
                  <div className="singlecourse-description-bottom-icon">
                    <img src={lessonsICON}></img>
                    <p>42</p>
                  </div>
                  <div className="singlecourse-description-bottom-icon">
                    <img src={languageICON}></img>
                    <p>انگلیسی </p>
                  </div>
                  <div className="singlecourse-description-bottom-icon">
                    <img src={linkICON}></img>
                    <p>Udemy.com</p>
                  </div>
                  <div className="singlecourse-description-bottom-icon">
                    <img src={authorICON}></img>
                    <p>Andrew Mead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="courseLongDescription-container">
            <p>
              لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و
              بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح
              گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و
              ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید،
              تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.
              معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و
              بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند
              که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد
              چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته
              شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه
              رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی
              وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه
              گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به
              پایان برند.
            </p>
          </div>
          <SingleCourseTab className="SingleCourseTab" />
        </div>
        <Social />
      </div>
    );
  }
}
