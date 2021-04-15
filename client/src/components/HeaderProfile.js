import React from "react";

function HeaderProfile({ userName, userAvatar }) {
  return (
    <div className="header-profile-container">
      <img src={userAvatar}></img>
      <p className="header-profile-welcome">{userName} عزیز خوش آمدید</p>
    </div>
  );
}

export default HeaderProfile;
