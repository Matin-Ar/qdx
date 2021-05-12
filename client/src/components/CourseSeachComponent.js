import axios, { CancelToken } from "axios";
import React, { useEffect, useState } from "react";
import searchicon from "../assets/search-icon.png";
import useQuery from "react-query";

function CourseSeachComponent() {
  const [searchValue, setSearchValue] = useState("salam");

  const query = useQuery("todos", () => {
    // Create a new CancelToken source for this request
    const source = CancelToken.source();

    const promise = axios.get(`/search/${searchValue}`, {
      // Pass the source token to your request
      cancelToken: source.token,
    });

    // Cancel the request if React Query calls the `promise.cancel` method
    promise.cancel = () => {
      source.cancel("Query was cancelled by React Query");
    };

    return promise;
  });

  // useEffect(async () => {
  //   try {
  //     console.log(searchValue);
  //     const res = await axios
  //       .get("/search", {
  //         data: { name: searchValue },
  //       })
  //       .then((res) => console.log("search result", res.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [searchValue]);

  return (
    <>
      <input
        className="hero-input"
        type="text"
        placeholder="جستجو "
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <img className="hero-input-icon" src={searchicon} autoFocus></img>
    </>
  );
}

export default CourseSeachComponent;
