import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import editIMG from "../../assets/edit.png";
import deleteIMG from "../../assets/delete.png";
import LoadIMG from "../../assets/Skateboarding.gif";

import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Test() {
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [addCategoryInput, setAddCategoryInput] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [tutorialsArr, setTutorialsArr] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios.get("/categories").then((res) => {
      console.log("categories array is ", res.data);
      setCategoriesArr(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("setting is loading to:", !!selectedCategory);
    setIsLoading(!!selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory !== "") {
      axios.get(`/categories/${selectedCategory}`).then((res) => {
        console.log("selected category is", selectedCategory);
        console.log("tutorials array is ", res.data);
        setTutorialsArr(res.data);
        setIsLoading(false);
      });
    }
  }, [selectedCategory]);

  const handleDeleteLanguage = (e, name) => {
    e.preventDefault();
    console.log(name);
  };

  const handleDeleteCategory = (e, name) => {
    e.preventDefault();
    const promptResult = prompt(
      `شما در حال حذف دسته بندی می باشید ، با حذف دسته بندی تمامی اطلاعات دوره های داخل آن حذف میگردد آیا مطمئن هستید؟`
    );
    if (promptResult == "yes") {
      axios
        .delete("/categories", { data: { name } })
        .then(
          (res) => {
            alertify.success("دسته بندی  با موفقیت حذف شد");
          },
          (err) => console.log("err from handleDeleteCategory:", err)
        )
        .then(
          axios.get("/categories").then((res) => {
            setCategoriesArr(res.data);
          })
        );
    }
  };

  const handleEditCategory = (e, oldname) => {
    e.preventDefault();
    const newname = prompt(
      `شما در حال تغییر نام دسته بندی می باشید، لطفا نام جدید دسته بندی را وارد نمایید`
    );

    if (newname.trim() != "") {
      axios
        .patch("/categories", { oldname, newname })
        .then((res) => {
          if (res.status === 200) {
            alertify.success("دسته بندی  با موفقیت ویرایش شد");
            axios.get("/categories").then((res) => {
              setCategoriesArr(res.data);
            });
          }
        })
        .catch((err) => console.log("err from editingCategory", err));
    }
  };

  const handleAddCategory = (e) => {
    if (addCategoryInput.trim() != "") {
      axios.post("/categories", { name: addCategoryInput }).then((res) => {
        if (res.status == 201) {
          axios.get("/categories").then((res) => {
            alertify.success("دسته بندی  با موفقیت اضافه شد");
            setCategoriesArr(res.data);
            setAddCategoryInput("");
          });
        }
      });
    }
  };

  return (
    <div className="tablepage-wrapper">
      <div className="table-container">
        {isLoading && (
          <div className="loading-container">
            {<img className="loading-gif" src={LoadIMG} />}

            <p>
              رو دریافت کنه لطفا منتظر بمانید {selectedCategory} پیک فرستادیم
              اطلاعات {isLoading}
            </p>
          </div>
        )}
        {!selectedCategory && (
          <TableContainer component={Paper}>
            <div className="add-category-table">
              <input
                type="text"
                className="add-category-input-table"
                value={addCategoryInput}
                onChange={(e) => setAddCategoryInput(e.target.value)}
                placeholder="برای افزودن دسته بندی نام آن را وارد نمایید و روی افزودن دسته بندی کلیک نمایید"
              />
              <button
                type="submit"
                className="add-category-button-table"
                onClick={(e) => {
                  handleAddCategory(e);
                }}
              >
                افزودن دسته بندی
              </button>
            </div>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">عملیات</TableCell>

                  <TableCell align="center">id</TableCell>
                  <TableCell align="right">نام دسته بندی</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesArr &&
                  categoriesArr.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell align="left">
                        <button
                          className="delete-button-table"
                          onClick={(e) => handleDeleteCategory(e, item.name)}
                        >
                          <img
                            className="edit-image-table"
                            src={deleteIMG}
                          ></img>
                        </button>
                        <button
                          className="edit-button-table"
                          onClick={(e) => {
                            handleEditCategory(e, item.name);
                          }}
                        >
                          <img className="edit-image-table" src={editIMG}></img>
                        </button>
                      </TableCell>

                      <TableCell align="center" component="th" scope="row">
                        {item._id}
                      </TableCell>

                      <TableCell align="right">
                        <button
                          className="category-button-table"
                          onClick={() => {
                            setSelectedCategory(item.name);
                          }}
                        >
                          {item.name}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedCategory && !isLoading && (
          <TableContainer component={Paper}>
            <div className="add-language-table">
              <div className="add-language-top-table">
                <p>
                  ❗️ شما در حال ویرایش زبان های برنامه نویسی موجود در دسته بندی{" "}
                  {selectedCategory} می باشید
                </p>
                <button
                  className="add-language-button-top-table"
                  onClick={() => setSelectedCategory("")}
                >
                  بازگشت به دسته بندی ها
                </button>
              </div>
              <input
                type="text"
                className="add-language-input-table"
                value={addCategoryInput}
                onChange={(e) => setAddCategoryInput(e.target.value)}
                placeholder="برای افزودن دسته بندی نام آن را وارد نمایید و روی افزودن دسته بندی کلیک نمایید"
              />
              <button
                type="submit"
                className="add-language-button-table"
                onClick={(e) => {
                  handleAddCategory(e);
                }}
              >
                افزودن دسته بندی
              </button>
            </div>

            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">عملیات</TableCell>
                  <TableCell align="right">نام</TableCell>

                  <TableCell align="right">تصویر</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tutorialsArr &&
                  tutorialsArr.map((item) => (
                    <TableRow key={item._id} className="tablebody-row">
                      <TableCell align="left">
                        <button
                          onClick={(e) => {
                            handleDeleteLanguage(e, item.name);
                          }}
                        >
                          حذف زبان
                        </button>
                        <button>ویرایش زبان</button>
                      </TableCell>
                      <TableCell align="right">{item.name}</TableCell>

                      <TableCell component="th" scope="row" align="right">
                        {
                          <img
                            className="table-avatar"
                            src={`http://localhost:3001/tutorials/${item.name}/avatar`}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
