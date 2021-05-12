import axios from "axios";
import React, { useEffect, useState } from "react";
import searchicon from "../assets/search-icon.png";

function CourseSeachComponent() {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios.post(`/search`, {});
  }, [searchValue]);

  return (
    <>
      <input
        className="hero-input"
        type="text"
        placeholder="جستجو .... "
        value={searchValue}
        onChange={(e) => setSearchValue(e.value)}
      />
      <img className="hero-input-icon" src={searchicon} autoFocus></img>
    </>
  );
}

export default CourseSeachComponent;
