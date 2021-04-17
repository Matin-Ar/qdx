import React from "react";
import Select from "react-select";

export default function AddCourseTabOne() {
  return (
    <div>
      <div className="form-group">
        <label>دسته بندی دوره را انتخاب نمایید</label>
        <Select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </div>
      <div className="form-group">
        <label>زبان برنامه نویسی مورد نظر را انتخاب نمایید</label>
        <Select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </div>
    </div>
  );
}
