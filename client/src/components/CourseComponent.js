//this component is responsible to render a single courseComponent in the homepage and where ever it is needed
import jscourseIMG from "../assets/courses/courseimage/js-course.png";
import React, { useEffect, useState } from "react";
import durationICON from "../assets/courses/duration.png";
import authorICON from "../assets/courses/author.png";
import languageICON from "../assets/courses/language.png";
import lessonsICON from "../assets/courses/lessons.png";
import linkICON from "../assets/courses/link.png";
import { Link } from "react-router-dom";

export default function CourseComponent(props) {
  return (
    <div className="single-course-Container-wrapper">
      {props.course && (
        <div className="singlecoursecomponent">
          <div className="singlecourse-img-wrapper">
            <img src={`/courses/${props.course.title}/avatar`}></img>
          </div>
          <div className="singlecourse-description-wrapper">
            <h3 className="singlecourse-description-title">
              {props.course.title}
            </h3>
            <p className="singlecourse-description-text">
              {props.course.shortdesc}
            </p>
            <div className="singlecourse-description-bottom-wrapper">
              <div className="singlecourse-description-bottom-icons">
                <div className="singlecourse-description-bottom-icon">
                  <img src={durationICON}></img>
                  <p>{props.course.duration}</p>
                </div>
                <div className="singlecourse-description-bottom-icon">
                  <img src={lessonsICON}></img>
                  <p>{props.course.numberofvideos}</p>
                </div>
                <div className="singlecourse-description-bottom-icon">
                  <img src={languageICON}></img>
                  <p>{props.course.language}</p>
                </div>
                <div className="singlecourse-description-bottom-icon">
                  <img src={linkICON}></img>
                  <p>{props.course.publisher}</p>
                </div>
                <div className="singlecourse-description-bottom-icon">
                  <img src={authorICON}></img>
                  <p>{props.course.author}</p>
                </div>
              </div>
              <Link to={`/course/${props.course.title}`}>
                <button className="singlecourse-description-button">
                  دانلود دوره
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
