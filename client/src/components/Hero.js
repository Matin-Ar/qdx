import React from "react";
import searchicon from "../assets/search-icon.png";
import CourseSeachComponent from "./CourseSeachComponent";
export default function Hero() {
  return (
    <div className="hero-container">
      <h1 className="hero-title"> دوره های آموزشی برنامه نویسی</h1>
      <p className="hero-subtitle">مهارت محور و مخصوص ورود به بازار کار</p>
      <div className="hero-input-container">
        <CourseSeachComponent />
      </div>
    </div>
  );
}
