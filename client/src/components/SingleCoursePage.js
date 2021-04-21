import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Social from "./Social";
import SingleCourseComponent from "./SingleCourseComponent";

function SingleCoursePage() {
  const { courseName } = useParams();
  return (
    <div className="singleCousePage-wrapper">
      <SingleCourseComponent courseName={courseName} />
      <Social />
    </div>
  );
}

export default SingleCoursePage;
