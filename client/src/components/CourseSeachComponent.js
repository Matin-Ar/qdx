import axios from "axios";
import React, { useEffect, useState } from "react";
import searchicon from "../assets/search-icon.png";

function CourseSeachComponent() {
  const [searchValue, setSearchValue] = useState("");

  const source = axios.CancelToken;

  useEffect(() => {
    console.log(searchValue);
    axios
      .get(
        `/search`,
        { name: searchValue },
        { cancelToken: source.CancelToken }
      )
      .then((res) => console.log("search result", res.data));
  }, [searchValue]);

  return (
    <>
      {searchValue && <h1>{searchValue}</h1>}
      <input
        className="hero-input"
        type="text"
        placeholder="جستجو "
        value={searchValue}
        onChange={(e) => setSearchValue(e.value)}
      />
      <img className="hero-input-icon" src={searchicon} autoFocus></img>
    </>
  );
}

export default CourseSeachComponent;
