import React from "react";
import enemadICON from "../assets/nemad/enamad.png";
import nashrICON from "../assets/nemad/nashr.png";
import samandehiICON from "../assets/nemad/samandehi.png";
import zplogo from "../assets/nemad/zplogo.png";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top-wrapper">
        <div className="footer-top-right">
          <h1 className="footer-logo">
            QD<span>X</span>
          </h1>
          <p className="footer-subtitle"> دوره های آموزشی برنامه نویسی</p>
          <p className="footer-text">
            هدف مجموعه کداکس افزایش سطح کیفیت آموزش و ساختن راهی برای ورود
            دانشجویان به بازار کار تخصصی است
          </p>
        </div>
        <div className="footer-top-left">
          <div className="nemad-wrapper">
            <img src={enemadICON}></img>
          </div>
          <div className="nemad-wrapper">
            <img src={nashrICON}></img>
          </div>
          <div className="nemad-wrapper">
            <img src={samandehiICON}></img>
          </div>
          <div className="nemad-wrapper">
            <img src={zplogo}></img>
          </div>
        </div>
      </div>
      <div className="footer-bottom-wrapper">
        <p>QDX is a simple OpenSource Project | Designed with ❤️ by A & M</p>
      </div>
    </div>
  );
}
