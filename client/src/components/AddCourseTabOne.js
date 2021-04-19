import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import axios from "axios";

export default function AddCourseTabOne({ handleFormChange }) {
  const [selectedCategory, setSelectedCategory] = useState("placeholder");
  const [categoriesList, setCategoriesList] = useState([]);
  const [tutorialsList, setTutorialsList] = useState([]);

  useEffect(() => {
    axios.get("/categories").then(
      (resp) => {
        if (resp.status === 200) {
          const categoriesArr = resp.data.map((item) => item.name);
          setCategoriesList(categoriesArr);
        }
      },
      (error) => console.log(error)
    );
  }, [categoriesList.length]);

  useEffect(() => {
    axios.get(`/tutorials/${selectedCategory}`).then(
      (res) => {
        let tutArr = res.data.map((tut) => tut.name);
        setTutorialsList(tutArr);
      },
      (err) => console.log(err)
    );
  }, [selectedCategory]);

  return (
    <div className="add-course-tab-one-container">
      {/* picking the category */}

      <div className="add-course-tab-one-form-group">
        <label className="add-course-tab-one-form-group-label">
          دسته بندی دوره را انتخاب نمایید
        </label>
        <select
          className="add-course-tab-one-form-group-select-box"
          name="courseCategory"
          value={selectedCategory}
          required
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleFormChange(e);
          }}
        >
          <option value="placeholder" disabled hidden>
            دسته بندی
          </option>
          {categoriesList &&
            categoriesList.map((category) => {
              return (
                <option key={category} name={category}>
                  {category}
                </option>
              );
            })}
        </select>{" "}
      </div>

      {/* picking the language */}
      <div className="add-course-tab-one-form-group">
        <label className="add-course-tab-one-form-group-label">
          زبان برنامه نویسی مورد نظر را انتخاب نمایید
        </label>
        <select
          required
          name="courseTutorial"
          className="add-course-tab-one-form-group-select-box"
          disabled={selectedCategory === "placeholder" ? true : false}
          onChange={handleFormChange}
        >
          <option value="lang-placeholder" disabled hidden selected>
            ابتدا دسته بندی مورد نظر را انتخاب نمایید
          </option>
          {tutorialsList.map((tutorial) => {
            return (
              <option key={tutorial} value={tutorial}>
                {tutorial}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
