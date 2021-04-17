import React, { Component } from "react";
import AddCourseTabOne from "./AddCourseTabOne";

export class AddCourseTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="add-course-tab-wrapper">
        <form>
          <AddCourseTabOne />
        </form>
        <button>قبلی</button>
        <button>بعدی</button>
      </div>
    );
  }
}

export default AddCourseTab;
