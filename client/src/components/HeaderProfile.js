import React from "react";

function HeaderProfile({ userName }) {
  return (
    <div className="header-profile-container">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"></img>
      <p className="header-profile-welcome">{userName} عزیز خوش آمدید</p>
    </div>
  );
}

export default HeaderProfile;
