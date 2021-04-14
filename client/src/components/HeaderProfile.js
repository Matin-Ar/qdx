import React from "react";

function HeaderProfile({ userName, userId }) {
  return (
    <div className="header-profile-container">
      <img src={`http://localhost:3001/users/${userId}/avatar`}></img>
      <p className="header-profile-welcome">{userName} عزیز خوش آمدید</p>
    </div>
  );
}

export default HeaderProfile;
