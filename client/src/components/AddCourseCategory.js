import axios from "axios";
import React, { useState, useEffect } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function AddCourseCategory() {
  const [newCategory, setnewCategory] = useState("");
  const [buttonText, setButtonText] = useState("افزودن دسته بندی");
  const [isDisabled, setisDisabled] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

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

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim() != "") {
      setButtonText("در حال اضافه نمودن دسته بندی");
      console.log(e);
      axios.post("/categories", { name: newCategory }).then((res) => {
        if (res.status === 201) {
          setButtonText("دسته بندی جدید با موفقیت اضافه شد");
          alertify.success("دسته بندی جدید با موفقیت اضافه شد");
          axios.get("/categories").then(
            (resp) => {
              if (resp.status === 200) {
                const categoriesArr = resp.data.map((item) => item.name);
                setCategoriesList(categoriesArr);
              }
            },
            (error) => console.log(error)
          );
          setisDisabled(true);
          setTimeout(() => {
            setisDisabled(false);
            setButtonText("افزودن دسته بندی");
          }, 3000);
        }
      });
    } else {
      alertify.error("لطفا نام مناسبی انتخاب نمایید");
    }
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    const categoryToDelete = e.target.name.toString();
    const promptResult = prompt(
      `شما در حال حذف دیتابیس می باشید ، با حذف دیتابیس تمامی اطلاعات دوره حذف میگردد آیا مطمئن هستید؟`
    );

    if (promptResult == "yes") {
      axios
        .delete("/categories", { data: { name: categoryToDelete } })
        .then(
          (res) => {
            alertify.success("دسته بندی  با موفقیت حذف شد");
          },
          (err) => alertify.error(err)
        )
        .then(() => {
          axios.get("/categories").then(
            (resp) => {
              if (resp.status === 200) {
                const categoriesArr = resp.data.map((item) => item.name);
                setCategoriesList(categoriesArr);
              }
            },
            (error) => console.log(error)
          );
        });
    }
  };

  return (
    <div className="add-category-tab-container">
      <form
        className="add-category-tab-form-group"
        onSubmit={handleCategorySubmit}
      >
        <h3 className="add-category-tab-title">
          دسته بندی مورد نظر را وارد نمایید
        </h3>
        <input
          value={newCategory}
          required
          onChange={(e) => {
            setnewCategory(e.target.value);
          }}
          type="text"
          className="add-category-tab-input"
          placeholder="نام دسته بندی مورد نظر را وارد نمایید،"
        />
        <input
          type="submit"
          name="newCategorySubmitBtn"
          className="add-category-tab-button"
          value={buttonText}
          disabled={isDisabled}
        />
      </form>

      <div className="category-displays-container">
        <div className="category-displays-wrapper">
          <h6>لیست دسته بندی های موجود</h6>
          <ul>
            {categoriesList.map((item) => {
              return (
                <button
                  className="category-displays-buttons"
                  onClick={handleDeleteCategory}
                  name={item}
                >
                  <span className="category-displays-span">X</span>
                  <li className="category-displays-li" key={item} name={item}>
                    {item}
                  </li>
                </button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
