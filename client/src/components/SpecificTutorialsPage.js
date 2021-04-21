// this page will render all the courses for a specific tutorial

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseComponent from "../components/CourseComponent";

function SpecificTutorialsPage() {
  const [courseList, setCourseList] = useState([]);
  const { tutorial } = useParams();

  useEffect(() => {
    axios
      .get(`/tutorials/${tutorial}`)
      .then((res) => {
        setCourseList(res.data);
        console.log("this is from the course list", courseList);
      })
      .catch((err) => console.log(err));
  }, [courseList.length]);

  return (
    <div className="SpecificTutorialsPage-wrapper">
      <div className="SpecificTutorialsPage-container">
        {courseList &&
          courseList.map((course) => {
            return <CourseComponent course={course} />;
          })}
      </div>
    </div>
  );
}

export default SpecificTutorialsPage;
