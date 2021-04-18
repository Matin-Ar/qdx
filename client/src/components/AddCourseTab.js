import React, { Component } from "react";
import AddCourseTabOne from "./AddCourseTabOne";
import AddCourseTabTwo from "./AddCourseTabTwo";

export class AddCourseTab extends Component {
  constructor(props) {
    super(props);

    this.handleNextTab = this.handleNextTab.bind(this);
    this.handlePrevTab = this.handlePrevTab.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    this.state = {
      addCourseStep: 1,
      courseCategory: "",
      courseTutorial: "",
      courseTitle: "",
      couseIMG: "",
      courseShortDisc: "",
      courseLongDisc: "",
      courseDuration: "",
      courseAuthor: "",
      coursePublisher: "",
      courseLanguage: "",
      courseNumberOfVideos: "",
      courseQuality: "",
      courseFileSize: "",
    };
  }

  handleNextTab() {
    this.setState((prevState) => {
      return {
        addCourseStep: prevState.addCourseStep + 1,
      };
    });

    console.log(this.state.addCourseStep);
  }

  handlePrevTab() {
    this.setState((prevState) => {
      return {
        addCourseStep: prevState.addCourseStep - 1,
      };
    });

    console.log(this.state.addCourseStep);
  }

  handleFormChange(e) {
    this.setState((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  }

  render() {
    return (
      <div className="add-course-tab-wrapper">
        {this.state.courseTutorial}
        <form>
          {this.state.addCourseStep === 1 && (
            <AddCourseTabOne handleFormChange={this.handleFormChange} />
          )}

          {this.state.addCourseStep === 2 && (
            <AddCourseTabTwo handleFormChange={this.handleFormChange} />
          )}
        </form>
        <button onClick={this.handlePrevTab}>قبلی</button>
        <button onClick={this.handleNextTab}>بعدی</button>
      </div>
    );
  }
}

export default AddCourseTab;
