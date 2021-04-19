import React, { Component } from "react";
import AddCourseTabOne from "./AddCourseTabOne";
import AddCourseLinks from "./AddCourseLinks";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export class AddCourseTab extends Component {
  constructor(props) {
    super(props);
    this.handleAddCourseLinks = this.handleAddCourseLinks.bind(this);
    this.handleDeleteCourseLinks = this.handleDeleteCourseLinks.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      buttonText: "ثبت دوره",
      buttonDisabled: false,
      courseCategory: "",
      courseTutorial: "",
      courseTitle: "",
      couseIMG: "",
      courseImgName: "",
      courseShortDisc: "",
      courseLongDisc: "",
      courseDuration: "",
      courseAuthor: "",
      coursePublisher: "",
      courseLanguage: "",
      courseNumberOfVideos: "",
      courseQuality: "",
      courseFileSize: "",
      courseRelease: "",
      courseLinks: [""],
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      buttonText: "در حال ساخت دوره جدید ، لطفا منتظر بمانید",
      buttonDisabled: true,
    });

    if (
      this.state.courseCategory &&
      this.state.courseTutorial &&
      this.state.courseTitle &&
      this.state.couseIMG &&
      this.state.courseShortDisc &&
      this.state.courseLongDisc &&
      this.state.courseDuration &&
      this.state.courseAuthor &&
      this.state.coursePublisher &&
      this.state.courseLanguage &&
      this.state.courseNumberOfVideos &&
      this.state.courseQuality &&
      this.state.courseFileSize &&
      this.state.courseRelease &&
      this.state.courseLinks.length > 0
    ) {
      const file = this.state.couseIMG;
      console.log(this.state.courseLinks);
      let form = new FormData();
      form.append("title", this.state.courseTitle);
      form.append("tut", this.state.courseTutorial);
      form.append("shortdesc", this.state.courseShortDisc);
      form.append("longdesc", this.state.courseLongDisc);
      form.append("duration", this.state.courseDuration);
      form.append("author", this.state.courseAuthor);
      form.append("publisher", this.state.coursePublisher);
      form.append("language", this.state.courseLanguage);
      form.append("numberofvideos", this.state.courseNumberOfVideos);
      form.append("filedate", this.state.courseRelease);
      form.append("quality", this.state.courseQuality);
      form.append("filesize", this.state.courseFileSize);
      form.append("links", this.state.courseLinks);
      form.append("avatar", file);
      // this.state.courseLinks
      axios({
        url: "/courses",
        method: "POST",
        data: form,
      })
        .then((res) => {
          console.log(res.data);
          console.log(res.status);
          alertify.success("دوره با موفقیت اضافه شد");
          this.setState({
            buttonText: "دوره با موفقیت اضافه شد",
            buttonDisabled: true,
          });

          setTimeout(() => {
            this.setState({
              buttonText: "ثبت دوره",
              buttonDisabled: false,
            });
          }, 3000);
        })
        .catch((err) => {
          alertify.error(
            "عملیات با مشکل مواجه شد لطفا از صحت داده های خود اطمینان حاصل فرمایید"
          );
          this.setState({
            buttonText:
              "عملیات با مشکل مواجه شد لطفا از صحت داده های خود اطمینان حاصل فرمایید",
            buttonDisabled: true,
          });

          setTimeout(() => {
            this.setState({
              buttonText: "ثبت دوره",
              buttonDisabled: false,
            });
          }, 3000);

          console.log(err);
        });
    }
  }

  handleAddCourseLinks(e) {
    this.setState({
      ...this.state,
      courseLinks: [...this.state.courseLinks, ""],
    });
  }

  handleDeleteCourseLinks(e) {
    e.preventDefault();
    const myindex = e.currentTarget.getAttribute("index");
    const array = this.state.courseLinks;

    console.log("prevArray", array);
    const newArray = array.splice(myindex, 1);
    console.log("new array after splice", newArray);
    this.setState({
      ...this.state,
      courseLinks: array,
    });
  }

  handleLinkChange(e, index) {
    const arr = this.state.courseLinks;
    const newAmount = e.target.value;
    arr[index] = newAmount;
    console.log(arr);
    this.setState({
      ...this.state,
      courseLinks: arr,
    });
  }

  handleFormChange(e) {
    e.preventDefault();
    if (e.target.name === "couseIMG") {
      console.log(e.target.name, "is : ", e.target.files[0]);

      this.setState((prevstate) => {
        return {
          ...prevstate,
          [e.target.name]: e.target.files[0],
          courseImgName: e.target.value,
        };
      });
    } else {
      console.log(e.target.name, "is : ", e.target.value);

      this.setState((prevstate) => {
        return {
          ...prevstate,
          [e.target.name]: e.target.value,
        };
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="add-course-data-wrapper">
            <div className="add-course-right-inputs">
              <div className="category-and-tutorial-selecter-wrapper">
                <AddCourseTabOne handleFormChange={this.handleFormChange} />
              </div>

              <label className="add-course-input-label">
                <p>نام دوره</p>
                <input
                  required
                  value={this.courseTitle}
                  name="courseTitle"
                  className="add-course-input"
                  type="text"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>مدت زمان</p>
                <input
                  value={this.courseDuration}
                  type="text"
                  className="add-course-input"
                  name="courseDuration"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>ناشر</p>
                <input
                  required
                  value={this.coursePublisher}
                  type="text"
                  className="add-course-input"
                  name="coursePublisher"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>نویسنده</p>
                <input
                  required
                  value={this.courseAuthor}
                  type="text"
                  className="add-course-input"
                  name="courseAuthor"
                  onChange={this.handleFormChange}
                />
              </label>
            </div>
            <div className="add-course-left-inputs">
              <label className="add-course-input-label">
                <p>زبان دوره</p>
                <input
                  required
                  value={this.courseLanguage}
                  type="text"
                  className="add-course-input"
                  name="courseLanguage"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>تعداد ویدیو</p>
                <input
                  required
                  value={this.courseNumberOfVideos}
                  type="text"
                  className="add-course-input"
                  name="courseNumberOfVideos"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>تاریخ انتشار</p>
                <input
                  name="courseRelease"
                  type="text"
                  className="add-course-input"
                  onChange={this.handleFormChange}
                />
              </label>

              <label className="add-course-input-label">
                <p>کیفیت ویدیو ها</p>
                <input
                  required
                  value={this.courseQuality}
                  type="text"
                  className="add-course-input"
                  name="courseQuality"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>حجم دوره (گیگابایت)</p>
                <input
                  required
                  type="text"
                  value={this.courseFileSize}
                  className="add-course-input"
                  name="courseFileSize"
                  onChange={this.handleFormChange}
                />
              </label>
              <label className="add-course-input-label">
                <p>آپلود عکس دوره</p>
                <p className="add-course-avatar-input-btn">آپلود</p>
                {this.state.courseImgName && <p>{this.state.courseImgName}</p>}
                <input
                  required
                  name="couseIMG"
                  value={this.couseIMG}
                  type="file"
                  className="add-course-input  add-course-avatar-input"
                  onChange={this.handleFormChange}
                />
              </label>
            </div>

            <AddCourseLinks
              courseLinks={this.state.courseLinks}
              handleAddCourseLinks={this.handleAddCourseLinks}
              handleDeleteCourseLinks={this.handleDeleteCourseLinks}
              handleLinkChange={this.handleLinkChange}
            />

            <div className="add-course-bottom-inputs">
              <label className="add-course-input-label">
                <p>توضیح کوتاه</p>
                <textArea
                  required
                  value={this.courseShortDisc}
                  type="text"
                  className="add-course-input add-course-text-area"
                  name="courseShortDisc"
                  onChange={this.handleFormChange}
                />
              </label>

              <label className="add-course-input-label">
                <p>توضیح کامل</p>
                <textArea
                  required
                  value={this.courseLongDisc}
                  type="text"
                  className="add-course-input add-course-text-area"
                  name="courseLongDisc"
                  onChange={this.handleFormChange}
                />
              </label>
            </div>
          </div>
          <div className="add-course-form-submit-btn-container">
            <button
              className="add-course-form-submit-btn"
              type="submit"
              disabled={this.state.buttonDisabled}
            >
              {this.state.buttonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCourseTab;
