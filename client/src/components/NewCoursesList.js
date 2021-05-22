import React from "react";
import { useQuery } from "react-query";
import CourseComponent from "./CourseComponent";
import axios from "axios";
import Loader from "./Loader";

export default function NewCoursesList() {
  const courses = useQuery("newCourses", () => {
    return axios.get("/api/courses?limit=3&skip=0").then((res) => {
      return res.data;
    });
  });

  return (
    <div className="newcourseslist-container">
      <h2>جدید ترین دوره ها</h2>
      {courses.isLoading ? (
        <div className="all_categories_page_container">
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="newcourse-wrapper">
          {courses.data?.map((course) => {
            return (
              <CourseComponent course={course} tutorialName={course.title} />
            );
          })}
        </div>
      )}
    </div>
  );
}
