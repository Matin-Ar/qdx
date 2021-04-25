// this page will render all the courses for a specific tutorial

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useParams } from "react-router-dom";
import CourseComponent from "../components/CourseComponent";

function SpecificTutorialsPage() {
  const { tutorial } = useParams();

  const courseList = useQuery(`tutorial ${tutorial}`, () => {
    return axios.get(`/tutorials/${tutorial}`).then((res) => res.data);
  });

  return (
    <div className="SpecificTutorialsPage-wrapper">
      <div className="SpecificTutorialsPage-container">
        {courseList &&
          courseList.data?.map((course) => {
            return <CourseComponent course={course} tutorialName={tutorial} />;
          })}
      </div>
    </div>
  );
}

export default SpecificTutorialsPage;

// useEffect(() => {
//   axios
//     .get(`/tutorials/${tutorial}`)
//     .then((res) => {
//       setCourseList(res.data);
//       console.log("this is from the course list", courseList);
//     })
//     .catch((err) => console.log(err));
// }, [courseList.length]);

// return (
//   <div className="SpecificTutorialsPage-wrapper">
//     <div className="SpecificTutorialsPage-container">
//       {courseList &&
//         courseList.map((course) => {
//           return <CourseComponent course={course} tutorialName={tutorial} />;
//         })}
//     </div>
//   </div>
// );
