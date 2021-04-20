import React, { Component } from "react";

import Social from "./Social";
import SingleCourseComponent from "./SingleCourseComponent";

export default class SingleCoursePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="singleCousePage-wrapper">
        <SingleCourseComponent />
        <Social />
      </div>
    );
  }
}
