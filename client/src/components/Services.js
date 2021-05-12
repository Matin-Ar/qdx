import React from "react";
import heroIMG from "../assets/services/hero_full.webp";

function Services() {
  return (
    <div className="service-page-wrapper">
      <div className="service-page-hero">
        <img className="service-page-bg" src={heroIMG} />
        <div className="service-page-hero-text">
          <h1>QDX</h1>
          <h1>ارائه کننده راه کار های دیجیتال جهت پیشرف کسب و کار شما</h1>
          <a className="service-page-hero-button">ورود به استدیو Qdx</a>
        </div>
      </div>
    </div>
  );
}

export default Services;
