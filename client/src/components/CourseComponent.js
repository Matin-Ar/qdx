//this component is responsible to render a single courseComponent in the homepage and where ever it is needed
import jscourseIMG from "../assets/courses/courseimage/js-course.png";
import React from "react";
import durationICON from "../assets/courses/duration.png";
import authorICON from "../assets/courses/author.png";
import languageICON from "../assets/courses/language.png";
import lessonsICON from "../assets/courses/lessons.png";
import linkICON from "../assets/courses/link.png";

export default function CourseComponent() {
  return (
    <div>
      <div className="singlecoursecomponent">
        <div className="singlecourse-img-wrapper">
          <img src={jscourseIMG}></img>
        </div>
        <div className="singlecourse-description-wrapper">
          <h3 className="singlecourse-description-title">
            FUNCTIONAL JAVASCRIPT FIRST STEPS
          </h3>
          <p className="singlecourse-description-text">
            Subnautica Below Zero یک بازی جهان باز ( Open World ) و تک نفره می
            باشد که توسط استودیو Unknown Worlds Entertainment ساخته و در تاریخ
            30 ژانویه 2019 منتشر شد . شما در یک اقیانوس فضایی هستید که می توانید
            مناطق مختلف بازی در زیر دریا و روی خشکی را جستجو کنید . Below Zero
          </p>
          <div className="singlecourse-description-bottom-wrapper">
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
            <button className="singlecourse-description-button">
              دانلود دوره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
