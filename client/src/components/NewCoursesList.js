import React from "react";
import CourseComponent from "./CourseComponent";

export default function NewCoursesList() {
  return (
    <div className="newcourseslist-container">
      <h2>جدید ترین دوره ها</h2>
      <CourseComponent />
      <CourseComponent />
      <CourseComponent />
      <CourseComponent />
    </div>
  );
}
