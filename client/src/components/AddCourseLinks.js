import React from "react";
import addLinks from "../assets/Dashboard/add-links.png";
export default function AddCourseLinks({
  courseLinks,
  handleAddCourseLinks,
  handleDeleteCourseLinks,
  handleLinkChange,
}) {
  return (
    <div className="addCourseLinks-wrapper">
      <div className="addCourseLinks-btn" onClick={handleAddCourseLinks}>
        <span>
          <img src={addLinks} className="addCourseLinks-image" />
        </span>
        افزودن لینک دوره
      </div>

      {courseLinks.map((course, index) => {
        return (
          <div key={index} className="addCourseLinks-link-group">
            <label className="addCourseLinks-link-label">
              <span> آدرس لینک {index + 1} :</span>{" "}
              <input
                className="addCourseLinks-link-input"
                type="text"
                value={course}
                onChange={(e) => handleLinkChange(e, index)}
              />
              <button
                className="addCourseLinks-link-remove-btn"
                index={index}
                onClick={(e) => {
                  handleDeleteCourseLinks(e);
                }}
              >
                حذف لینک
              </button>
            </label>
          </div>
        );
      })}
    </div>
  );
}
