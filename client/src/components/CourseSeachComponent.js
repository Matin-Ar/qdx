import React, { useEffect, useState } from "react";
import searchicon from "../assets/search-icon.png";
import { useQuery } from "react-query";
import axios, { CancelToken } from "axios";
import Loader from "./Loader";
import notFoundIMG from "../assets/notfound.png";

function CourseSeachComponent() {
  const [searchValue, setSearchValue] = useState("");

  const query = useQuery(
    ["searchCourse", searchValue],
    () => {
      // Create a new CancelToken source for this request
      const source = CancelToken.source();

      const promise = axios
        .get(`/api/search/${searchValue}`, {
          // Pass the source token to your request
          cancelToken: source.token,
        })
        .then((res) => res.data);

      // Cancel the request if React Query calls the `promise.cancel` method
      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };

      return promise;
    },
    {
      enabled: !!searchValue,
    }
  );

  console.log("seachuseQuery", query);
  return (
    <>
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

      {query.isLoading && (
        <div className="search-result-container">
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      )}

      {query.isSuccess && query.data.length > 0 && (
        <div className="search-result-container">
          <div className="search-result-box">
            {query.data?.map((item) => {
              return (
                <>
                  <div className="search-result-item">
                    <img
                      className="search-result-image"
                      src={`/api/courses/${item.title}/avatar`}
                    ></img>
                    {item.title}
                  </div>
                  {/* <hr className="search-devider"></hr> */}
                </>
              );
            })}
          </div>
        </div>
      )}

      {query.isSuccess && query.data.length === 0 && (
        <div className="search-result-container">
          <div className="search-result-box">
            <div className="search-result-item">
              <img src={notFoundIMG}></img>
              <h1>متاسفانه دوره ای با کلید واژه جستجو شده یافت نشد</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseSeachComponent;
