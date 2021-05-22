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
import { Link } from "react-router-dom";

import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import EditCourse from "../EditCourse";

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

  const [addTutorialInput, setAddTutorialInput] = useState("");
  const [addTutorialImg, setAddTutorialImg] = useState(null);
  const [selectedTutorial, setSelectedTutorial] = useState("");
  const [coursesArr, setCoursesArr] = useState("");
  const [selectedCourse, setSelectedCourse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategoriesArr(res.data);
    });
  }, []);

  useEffect(() => {
    setIsLoading(!!selectedCategory);
  }, [selectedCategory, count]);

  useEffect(() => {
    if (selectedCategory !== "") {
      axios.get(`/api/categories/${selectedCategory}`).then((res) => {
        setTutorialsArr(res.data);
        setIsLoading(false);
      });
    }
  }, [selectedCategory, count]);

  useEffect(() => {
    if (selectedTutorial !== "") {
      axios.get(`/api/tutorials/${selectedTutorial}`).then((res) => {
        setCoursesArr(res.data);
        setIsLoading(false);
      });
    }
  }, [selectedTutorial, count]);

  const handleDeleteCategory = (e, name) => {
    e.preventDefault();
    const promptResult = prompt(
      `شما در حال حذف دسته بندی می باشید ، با حذف دسته بندی تمامی اطلاعات دوره های داخل آن حذف میگردد آیا مطمئن هستید؟`
    );
    if (promptResult == "yes") {
      axios
        .delete("/api/categories", { data: { name } })
        .then(
          (res) => {
            alertify.success("دسته بندی  با موفقیت حذف شد");
          },
          (err) => console.log("err from handleDeleteCategory:", err)
        )
        .then(
          axios.get("/api/categories").then((res) => {
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

    if (newname && newname.trim() != "") {
      axios
        .patch("/api/categories", { oldname, newname })
        .then((res) => {
          if (res.status === 200) {
            alertify.success("دسته بندی  با موفقیت ویرایش شد");
            axios.get("/api/categories").then((res) => {
              setCategoriesArr(res.data);
            });
          }
        })
        .catch((err) => console.log("err from editingCategory", err));
    }
  };

  const handleAddCategory = (e) => {
    if (addCategoryInput.trim() != "") {
      axios.post("/api/categories", { name: addCategoryInput }).then((res) => {
        if (res.status == 201) {
          axios.get("/api/categories").then((res) => {
            alertify.success("دسته بندی  با موفقیت اضافه شد");
            setCategoriesArr(res.data);
            setAddCategoryInput("");
          });
        }
      });
    }
  };

  const handleAddTutorial = (e) => {
    if (addTutorialInput.trim() != "" && addTutorialImg && selectedCategory) {
      let formData = new FormData();
      formData.append("avatar", addTutorialImg);
      formData.append("name", addTutorialInput);
      formData.append("cat", selectedCategory);

      axios({ url: "/api/tutorials", method: "POST", data: formData }).then(
        () => {
          alertify.success("زبان برنامه نویسی  با موفقیت اضافه شد");
          axios.get(`/api/categories/${selectedCategory}`).then((res) => {
            setTutorialsArr(res.data);
            setIsLoading(false);
          });
        }
      );
    }
  };

  const handleDeleteTutorial = (e, name) => {
    e.preventDefault();
    const promptResult = prompt(
      `شما در حال حذف دسته بندی می باشید ، با حذف دسته بندی تمامی اطلاعات دوره های داخل آن حذف میگردد آیا مطمئن هستید؟`
    );
    if (promptResult == "yes") {
      axios
        .delete("/api/tutorials", { data: { name } })
        .then(
          (res) => {
            alertify.success("زبان برنامه نویسی با موفقیت حذف شد");
          },
          (err) => console.log("err from handleDeleteCategory:", err)
        )
        .then(
          axios.get(`/api/categories/${selectedCategory}`).then((res) => {
            setTutorialsArr(res.data);
            setIsLoading(false);
          })
        );
    }
  };

  const handleEditTutorial = (e, oldname) => {
    e.preventDefault();
    const newname = prompt(
      `شما در حال تغییر نام زبان برنامه نویسی می باشید، لطفا نام جدید زبان را وارد نمایید`
    );

    if (newname && newname.trim() != "") {
      axios
        .patch("/api/tutorials", { oldname, newname })
        .then((res) => {
          if (res.status === 200) {
            alertify.success(" زبان برنامه نویسی با موفقیت ویرایش شد");
            axios.get(`/api/categories/${selectedCategory}`).then((res) => {
              setTutorialsArr(res.data);
              setIsLoading(false);
            });
          }
        })
        .catch((err) => console.log("err from editingCategory", err));
    }
  };

  //course related handlers

  const handleDeleteCourse = (e, title) => {
    e.preventDefault();
    const promptResult = prompt(
      `شما در حال حذف دسته بندی می باشید ، با حذف دسته بندی تمامی اطلاعات دوره های داخل آن حذف میگردد آیا مطمئن هستید؟`
    );
    if (promptResult == "yes") {
      axios
        .delete("/api/courses", { data: { title } })
        .then((res) => {
          alertify.success(" دوره با موفقیت حذف شد");
          axios.get(`/api/tutorials/${selectedTutorial}`).then((res) => {
            setCoursesArr(res.data);
            setIsLoading(false);
          });
        })
        .catch((err) => console.log(err));
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
        {!selectedCategory && !selectedTutorial && !selectedCourse && (
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
                  <TableCell align="right">نام دسته بندی</TableCell>

                  <TableCell align="center">id</TableCell>
                  <TableCell align="left">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesArr &&
                  categoriesArr.map((item) => (
                    <TableRow key={item._id}>
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
                      <TableCell align="center" component="th" scope="row">
                        {item._id}
                      </TableCell>

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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedCategory &&
          !selectedTutorial &&
          !isLoading &&
          !selectedCourse && (
            <TableContainer component={Paper}>
              <div className="add-language-table">
                <div className="add-language-top-table">
                  <p className="add-language-top-text">
                    ❗️ شما در حال ویرایش زبان های برنامه نویسی موجود در دسته
                    بندی {selectedCategory} می باشید
                  </p>
                  <button
                    className="add-language-button-top-table"
                    onClick={() => setSelectedCategory("")}
                  >
                    بازگشت به دسته بندی ها
                  </button>
                </div>
                <div className="add-new-language-table">
                  <input
                    type="text"
                    className="add-language-input-table"
                    value={addTutorialInput}
                    onChange={(e) => setAddTutorialInput(e.target.value)}
                    placeholder="برای افزودن زبان برنامه نویسی نام آن را وارد نمایید"
                  />

                  <input
                    type="file"
                    className="add-language-input-table"
                    onChange={(e) => setAddTutorialImg(e.target.files[0])}
                    placeholder="تصویر دوره را وارد نمایید"
                  />

                  <button
                    type="submit"
                    className="add-language-button-table"
                    onClick={(e) => {
                      handleAddTutorial(e);
                    }}
                  >
                    افزودن زبان برنامه نویسی
                  </button>
                </div>
              </div>

              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">تصویر</TableCell>

                    <TableCell align="right">نام</TableCell>
                    <TableCell align="left">عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tutorialsArr &&
                    tutorialsArr.map((item) => (
                      <TableRow key={item._id} className="tablebody-row">
                        <TableCell component="th" scope="row" align="right">
                          {
                            <img
                              className="table-avatar"
                              src={`http://localhost:3001/tutorials/${item.name}/avatar`}
                            />
                          }
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="tutorial-button-table"
                            onClick={() => setSelectedTutorial(item.name)}
                          >
                            {item.name}
                          </button>
                        </TableCell>

                        <TableCell align="left">
                          <button
                            className="delete-button-table"
                            onClick={(e) => handleDeleteTutorial(e, item.name)}
                          >
                            <img
                              className="edit-image-table"
                              src={deleteIMG}
                            ></img>
                          </button>
                          <button
                            className="edit-button-table"
                            onClick={(e) => {
                              handleEditTutorial(e, item.name);
                            }}
                          >
                            <img
                              className="edit-image-table"
                              src={editIMG}
                            ></img>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        {/*this is the table for showing courses in each tutorial*/}

        {selectedTutorial && !isLoading && !selectedCourse && (
          <TableContainer component={Paper}>
            <div className="add-language-table">
              <div className="add-language-top-table">
                <p className="add-language-top-text">
                  ❗️ شما در حال مشاهده دوره های {selectedTutorial} می باشید
                </p>
                <button
                  className="add-language-button-top-table"
                  onClick={() => {
                    setSelectedTutorial("");
                    setCoursesArr([]);
                  }}
                >
                  بازگشت به زبان های برنامه نویسی
                </button>
              </div>
            </div>

            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">تصویر</TableCell>
                  <TableCell align="right">نام</TableCell>

                  <TableCell align="right">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesArr &&
                  coursesArr?.map((item) => (
                    <TableRow key={item._id} className="tablebody-row">
                      <TableCell component="th" scope="row" align="right">
                        {
                          <img
                            className="table-avatar"
                            src={`/courses/${item.title}/avatar`}
                          />
                        }
                      </TableCell>

                      <TableCell align="right">
                        <Link
                          className="tutorial-button-table"
                          to={`/course/edit/${item.title}`}
                        >
                          {item.title}
                        </Link>
                      </TableCell>

                      <TableCell align="right">
                        <button
                          className="delete-button-table"
                          onClick={(e) => handleDeleteCourse(e, item.title)}
                        >
                          <img
                            className="edit-image-table"
                            src={deleteIMG}
                          ></img>
                        </button>
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
