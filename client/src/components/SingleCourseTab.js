import React, { Component } from "react";

export default class SinglePageTabs extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
      activeTab: "download-link-tab",
      // links: props.courseLinks,
    };
  }
  handleTabChange(e) {
    const selectedTab = e.target.innerHTML;
    if (selectedTab === "لینک دانلود دوره") {
      this.setState({
        activeTab: "download-link-tab",
      });
    } else if (selectedTab === "نظرات کاربران") {
      this.setState({
        activeTab: "user-comments-tab",
      });
    } else if (selectedTab === "سوالات") {
      this.setState({
        activeTab: "user-questions-tab",
      });
    }
  }

  render() {
    return (
      <div className="tabs-wrapper">
        <div className="tabs-container">
          <div className="tabs-title-container">
            <ul className="tabs-title">
              <li
                value="download"
                onClick={this.handleTabChange}
                className={
                  this.state.activeTab === "download-link-tab"
                    ? "download-link-tab active-tab"
                    : "download-link-tab"
                }
              >
                لینک دانلود دوره
              </li>
              <li
                value="comment"
                onClick={this.handleTabChange}
                className={
                  this.state.activeTab === "user-comments-tab"
                    ? "user-comment-tab active-tab"
                    : "user-comment-tab"
                }
              >
                نظرات کاربران
              </li>
              <li
                value="question"
                onClick={this.handleTabChange}
                className={
                  this.state.activeTab === "user-questions-tab"
                    ? "user-questions-tab active-tab"
                    : "user-questions-tab"
                }
              >
                سوالات
              </li>
            </ul>
          </div>
          <div className="tabs-data-container">
            {this.state.activeTab === "download-link-tab" && (
              <div className="download-link-tab active-content">
                {this.props.courseLinks &&
                  this.props.courseLinks.map((link, index) => {
                    return (
                      <a
                        key={index}
                        href={`${link}`}
                        className="course-download-links"
                      >
                        دانلود قسمت <span>{index + 1}</span>
                      </a>
                    );
                  })}
              </div>
            )}

            {this.state.activeTab === "user-comments-tab" && (
              <div className="user-comments-tab active-content">
                user Comment
              </div>
            )}

            {this.state.activeTab === "user-questions-tab" && (
              <div className="user-questions-tab active-content">
                user question
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
