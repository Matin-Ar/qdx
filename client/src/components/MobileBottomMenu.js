import React from "react";
import { Link } from "react-router-dom";
import homeImg from "../assets/home.png";
import videoIMG from "../assets/video.png";
import contactIMG from "../assets/contactus.png";
import aboutIMG from "../assets/about.png";

function MobileBottomMenu() {
  return (
    <div className="mobile-bottom-menu">
      <div className="mobile-bottom-menu-item">
        <Link to="/">
          <img src={homeImg} alt="" />
          صفحه اصلی
        </Link>
      </div>

      <div className="mobile-bottom-menu-item">
        <Link to="/categories">
          <img src={videoIMG} alt="" />

          <p>دسته بندی</p>
        </Link>
      </div>

      <div className="mobile-bottom-menu-item">
        <Link to="/aboutus">
          <img src={aboutIMG} alt="" />

          <p>درباره ما</p>
        </Link>
      </div>

      <div className="mobile-bottom-menu-item">
        <Link to="/contactus">
          <img src={contactIMG} alt="" />

          <p>تماس با ما</p>
        </Link>
      </div>
    </div>
  );
}

export default MobileBottomMenu;
