import axios from "axios";
import React, { useState, useEffect } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function AddCourseTutorial() {
  const [newTutorial, setnewTutorial] = useState("");
  const [buttonText, setButtonText] = useState(
    "افزودن زبان برنامه نویسی به دسته بندی"
  );
  const [isDisabled, setisDisabled] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tutorialAvatarFile, setTutorialAvatarFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    "دسته بندی زبان را انتخاب نمایید"
  );

  useEffect(() => {
    axios.get("/api/categories").then(
      (resp) => {
        if (resp.status === 200) {
          const categoriesArr = resp.data.map((item) => item.name);
          setCategoriesList(categoriesArr);
        }
      },
      (error) => console.log(error)
    );
  }, [categoriesList.length]);

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (
      newTutorial.trim() != "" &&
      tutorialAvatarFile != null &&
      selectedCategory != "لطفا یک دسته بندی را انتخاب نمایید"
    ) {
      console.log("will upload file");
      setButtonText("در حال اضافه نمودن زبان جدید");
      let formData = new FormData();
      formData.append("avatar", tutorialAvatarFile);
      formData.append("name", newTutorial);
      formData.append("cat", selectedCategory);

      axios({
        url: "/api/api/tutorials",
        method: "POST",
        data: formData,
      }).then((res) => {
        if (res.status === 201) {
          setButtonText("زبان برنامه نویسی جدید با موفقیت اضافه شد");
          alertify.success(" زبان برنامه نویسی جدید با موفقیت اضافه شد");
          setisDisabled(true);
          setTimeout(() => {
            setisDisabled(false);
            setButtonText("افزودن زبان برنامه نویسی");
          }, 3000);
        }
      });
    } else if (newTutorial.trim() == "") {
      alertify.error("لطفا نام مناسبی انتخاب نمایید");

      setTimeout(() => {
        setisDisabled(false);
        setButtonText("افزودن زبان برنامه نویسی");
      }, 3000);
    } else if (tutorialAvatarFile == null) {
      alertify.error("لطفا عکس زبان برنامه نویسی را انتخاب نمایید");
      setTimeout(() => {
        setisDisabled(false);
        setButtonText("افزودن زبان برنامه نویسی");
      }, 3000);
    } else if (
      newTutorial.trim() == "" ||
      tutorialAvatarFile == null ||
      selectedCategory == "لطفا یک دسته بندی را انتخاب نمایید"
    ) {
      alertify.error("لطفا دسته بندی مناسبی انتخاب نمایید");
      setTimeout(() => {
        setisDisabled(false);
        setButtonText("افزودن زبان برنامه نویسی");
      }, 3000);
    }
  };

  return (
    <div className="add-tutorial-tab-container">
      <form
        className="add-tutorial-tab-form-group"
        onSubmit={handleCategorySubmit}
      >
        <h6 className="add-tutorial-tab-title">
          زبان برنامه نویسی مورد نظر را وارد نمایید
        </h6>
        <input
          value={newTutorial}
          required
          onChange={(e) => {
            setnewTutorial(e.target.value);
          }}
          type="text"
          className="add-tutorial-tab-input"
          placeholder="نام زبان برنامه نویسی مورد نظر را وارد نمایید،"
        />

        <select
          className="add-tutorial-tab-input"
          required
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option selected hidden>
            لطفا یک دسته بندی را انتخاب نمایید
          </option>
          {categoriesList &&
            categoriesList.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>

        <label
          htmlFor="tutorialAvatar"
          className="add-tutorial-tab-avatar-input-label"
        >
          آپلود تصویر
          <input
            required
            className="add-tutorial-tab-avatar-input"
            type="file"
            id="tutorialAvatar"
            name="tutorialAvatar"
            accept="image/png, image/jpeg"
            onChange={(e) => setTutorialAvatarFile(e.target.files[0])}
          />
        </label>
        {tutorialAvatarFile && (
          <h6 className="add-tutorial-tab-avatar-file-name">
            {tutorialAvatarFile.name}
          </h6>
        )}
        <input
          type="submit"
          name="newCategorySubmitBtn"
          className="add-category-tab-button"
          value={buttonText}
          disabled={isDisabled}
        />
      </form>
    </div>
  );
}
