import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "./skeleton/Skeleton";
import frontEndIMG from "../assets/courses/frontend.jpg";

export default function AllCategoriesPage() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    axios
      .get("/tutorials")
      .then((res) => {
        if ((res.status = 200)) {
          setTutorials(res.data);
          console.log("categories array is", tutorials);
        }
      })
      .catch((err) => console.log(err));
  }, [tutorials.length]);

  return (
    <div className="allCategoriesPage-wrapper">
      <div className="allCategoriesPage-container">
        {tutorials.length === 0 && (
          <React.Fragment>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
            <div className="single-category-wrapper">
              <Skeleton type="text" />

              <div className="single-category-img-container">
                <Skeleton type="thumbnail" />
              </div>
            </div>
          </React.Fragment>
        )}

        <div className="single-category-wrapper">
          "Front-end"
          <div className="single-category-img-container">
            {" "}
            <img className="single-category-image" src={frontEndIMG}></img>
          </div>
        </div>

        {tutorials &&
          tutorials.map((tutorial) => {
            return (
              <div className="single-category-wrapper">
                {tutorial.name}{" "}
                <div className="single-category-img-container">
                  {" "}
                  <img
                    className="single-category-image"
                    src={`http://localhost:3001/tutorials/${tutorial.name}/avatar`}
                  ></img>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
