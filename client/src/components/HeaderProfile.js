import React from "react";
import { Link } from "react-router-dom";

function HeaderProfile({ userName, userAvatar }) {
  return (
    <div className="header-profile-container">
      <img src={userAvatar}></img>
      <Link to="/dashboard">
        <p className="header-profile-welcome">{userName} عزیز خوش آمدید</p>
      </Link>
    </div>
  );
}

export default HeaderProfile;
