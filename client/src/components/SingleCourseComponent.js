import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleCourseTab from "./SingleCourseTab";
import durationICON from "../assets/courses/duration.png";
import authorICON from "../assets/courses/author.png";
import languageICON from "../assets/courses/language.png";
import lessonsICON from "../assets/courses/lessons.png";
import downloadICON from "../assets/courses/download.png";

import linkICON from "../assets/courses/link.png";
import dummyCourseImg from "../assets/courses/courseimage/lodash.png";

export default function SingleCourseComponent(props) {
  const [course, setCourse] = useState([]);
  const [comments, setCourseComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/courses/${props.courseName}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, [course.length]);

  useEffect(() => {
    axios
      .get(`/api/comments/${course?._id}`)
      .then((res) => {
        console.log(res.data);
        setCourseComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [course.length]);

  return (
    <div className="singleCourse-container">
      <div className="imageContainer">
        <img src={`/courses/${course.title}/avatar`} />
      </div>
      <div className="courseShortDescription-container">
        <h1>{course.title}</h1>
        <p>{course.shortdesc}</p>
        <div className="infoIcon-container">
          <div className="infoIcon-top">
            <div className="singlecourse-description-bottom-icons">
              <div className="singlecourse-description-top-icon">
                <img src={durationICON}></img>
                <p>مدت زمان : {course.duration}</p>
              </div>
              <div className="singlecourse-description-top-icon">
                <img src={lessonsICON}></img>
                <p> تعداد جلسات : {course.numberofvideos}</p>
              </div>
              <div className="singlecourse-description-top-icon">
                <img src={languageICON}></img>
                <p>زبان : {course.language} </p>
              </div>
              <div className="singlecourse-description-top-icon">
                <img src={linkICON}></img>
                <p>ناشر: {course.publisher}</p>
              </div>
            </div>
          </div>
          <div className="infoIcon-bottom">
            <div className="singlecourse-description-bottom-icons">
              <div className="singlecourse-description-top-icon">
                <img src={authorICON}></img>
                <p>اساتید: {course.author}</p>
              </div>
              <div className="singlecourse-description-bottom-icon">
                <img src={languageICON}></img>
                <p>تاریخ انتشار: {course.filedate}</p>
              </div>
              <div className="singlecourse-description-bottom-icon">
                <img src={linkICON}></img>
                <p>کیفیت ویدیوها : {course.quality}</p>
              </div>
              <div className="singlecourse-description-bottom-icon">
                <img src={downloadICON} className="dlIcon"></img>
                <p>حجم: {course.filesize}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="courseLongDescription-container">
        <p>{course.longdesc}</p>
      </div>
      <SingleCourseTab
        className="SingleCourseTab"
        courseLinks={course.links}
        courseComments={comments}
      />
    </div>
  );
}
