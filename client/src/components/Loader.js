import React from "react";
import LoadIMG from "../assets/Skateboarding.gif";

function Loader() {
  return (
    <div className="loading-container">
      {<img className="loading-gif" src={LoadIMG} />}

      <p>رو دریافت کنه لطفا منتظر بمانید پیک فرستادیم اطلاعات</p>
    </div>
  );
}

export default Loader;
