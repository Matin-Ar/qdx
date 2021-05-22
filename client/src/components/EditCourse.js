import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCourseTabOne from "./AddCourseTabOne";
import EditCourseLinks from "./EditCourseLinks";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import Loader from "./Loader";

function EditCourse(props) {
  const { name } = useParams();

  const [buttonText, setButtonText] = useState("ثبت دوره");
  const [isDisabled, setIsDisabled] = useState(false);

  const [courseTitle, setcourseTitle] = useState("");
  const [courseIMG, setcourseIMG] = useState(null);
  const [courseShortDesc, setcourseShortDesc] = useState("");
  const [courseLongDesc, setcourseLongDesc] = useState("");
  const [courseDuration, setcourseDuration] = useState("");
  const [courseAuthor, setcourseAuthor] = useState("");
  const [coursePublisher, setcoursePublisher] = useState("");
  const [courseLanguage, setcourseLanguage] = useState("");
  const [courseNumberOfVideos, setcourseNumberOfVideos] = useState("");
  const [courseQuality, setcourseQuality] = useState("");
  const [courseFileSize, setcourseFileSize] = useState("");
  const [courseRelease, setcourseRelease] = useState("");
  const [courseLinks, setcourseLinks] = useState([]);

  const handleAddLink = (e) => {
    e.preventDefault();
    setcourseLinks((prevLink) => {
      return [...prevLink, ""];
    });
  };

  const handleDeleteCourseLinks = (e) => {
    e.preventDefault();
    const myindex = e.currentTarget.getAttribute("index");
    const array = courseLinks;

    const newArray = array.splice(myindex, 1);
    setcourseLinks((prevLink) => {
      return [...array];
    });
  };

  const handleLinkChange = (e, index) => {
    const arr = courseLinks;
    const newAmount = e.target.value;
    arr[index] = newAmount;
    console.log(arr);
    setcourseLinks((prevLink) => {
      return [...arr];
    });
  };

  useEffect(() => {
    axios
      .get(`/api/courses/${encodeURI(name)}`)
      .then((res) => {
        console.log(res.data);
        setcourseTitle(res.data.title);
        setcourseLinks(res.data.links);
        setcourseRelease(res.data.filedate);
        setcourseFileSize(res.data.filesize);
        setcourseQuality(res.data.quality);
        setcourseNumberOfVideos(res.data.numberofvideos);
        setcourseLanguage(res.data.language);
        setcoursePublisher(res.data.publisher);
        setcourseAuthor(res.data.author);
        setcourseDuration(res.data.duration);
        setcourseLongDesc(res.data.longdesc);
        setcourseShortDesc(res.data.shortdesc);
      })

      .catch((err) => console.log(err));
  }, []);

  const handleFormSubmit = () => {
    console.log("form submitted");
    setButtonText("در حال بروزرسانی دوره لطفا منتظر بمانیید");
    setIsDisabled(true);
    const stringLinks = courseLinks.toString();
    axios(`/api/courses/${name}`, {
      method: "PATCH",
      data: {
        title: courseTitle,
        links: stringLinks,
        filedate: courseRelease,
        filesize: courseFileSize,
        quality: courseQuality,
        numberofvideos: courseNumberOfVideos,
        language: courseLanguage,
        publisher: coursePublisher,
        author: courseAuthor,
        duration: courseDuration,
        longdesc: courseLongDesc,
        shortdesc: courseShortDesc,
      },
    })
      .then((res) => {
        console.log(res.status);
        alertify.success("عملیات با موفقیت انجام شد");
        setTimeout(() => {
          setButtonText("ثبت دوره");
          setIsDisabled(false);
        }, 5000);
      })
      .catch((err) => {
        alertify.error(
          "عملیات با مشکل مواجه شد لطفا از صحت داده های خود اطمینان حاصل فرمایید"
        );
        setTimeout(() => {
          setButtonText("ثبت دوره");
          setIsDisabled(false);
        }, 5000);
        console.log(err);
      });
  };

  return (
    <>
      {!courseTitle && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {courseTitle && (
        <div className="editCourse">
          <form onSubmit={handleFormSubmit}>
            <div className="add-course-data-wrapper">
              <div className="add-course-right-inputs">
                <label className="add-course-input-label">
                  <p>نام دوره</p>
                  <input
                    required
                    value={courseTitle}
                    name="courseTitle"
                    className="add-course-input"
                    type="text"
                    onChange={(e) => setcourseTitle(() => e.target.value)}
                  />
                </label>
                <label className="add-course-input-label">
                  <p>مدت زمان</p>
                  <input
                    value={courseDuration}
                    type="text"
                    className="add-course-input"
                    name="courseDuration"
                    onChange={(e) => setcourseDuration(() => e.target.value)}
                  />
                </label>
                <label className="add-course-input-label">
                  <p>ناشر</p>
                  <input
                    required
                    value={coursePublisher}
                    type="text"
                    className="add-course-input"
                    name="coursePublisher"
                    onChange={(e) => setcoursePublisher(() => e.target.value)}
                  />
                </label>
                <label className="add-course-input-label">
                  <p>نویسنده</p>
                  <input
                    required
                    value={courseAuthor}
                    type="text"
                    className="add-course-input"
                    name="courseAuthor"
                    onChange={(e) => setcourseAuthor(() => e.target.value)}
                  />
                </label>
              </div>
              <div className="add-course-left-inputs">
                <label className="add-course-input-label">
                  <p>زبان دوره</p>
                  <input
                    required
                    value={courseLanguage}
                    type="text"
                    className="add-course-input"
                    name="courseLanguage"
                    onChange={(e) => setcourseLanguage(() => e.target.value)}
                  />
                </label>
                <label className="add-course-input-label">
                  <p>تعداد ویدیو</p>
                  <input
                    required
                    value={courseNumberOfVideos}
                    type="text"
                    className="add-course-input"
                    name="courseNumberOfVideos"
                    onChange={(e) =>
                      setcourseNumberOfVideos(() => e.target.value)
                    }
                  />
                </label>
                <label className="add-course-input-label">
                  <p>تاریخ انتشار</p>
                  <input
                    value={courseRelease}
                    name="courseRelease"
                    type="text"
                    className="add-course-input"
                    onChange={(e) => setcourseRelease(() => e.target.value)}
                  />
                </label>

                <label className="add-course-input-label">
                  <p>کیفیت ویدیو ها</p>
                  <input
                    required
                    value={courseQuality}
                    type="text"
                    className="add-course-input"
                    name="courseQuality"
                    onChange={(e) => setcourseQuality(() => e.target.value)}
                  />
                </label>
                <label className="add-course-input-label">
                  <p>حجم دوره (گیگابایت)</p>
                  <input
                    required
                    type="text"
                    value={courseFileSize}
                    className="add-course-input"
                    name="courseFileSize"
                    onChange={(e) => setcourseFileSize(() => e.target.value)}
                  />
                </label>
                <label className="add-course-input-label">
                  <p>آپلود عکس دوره</p>
                  <p className="add-course-avatar-input-btn">آپلود</p>
                  <input
                    required
                    name="couseIMG"
                    type="file"
                    className="add-course-input  add-course-avatar-input"
                    onChange={(e) => setcourseIMG(e.target.files[0])}
                  />
                </label>
              </div>
              <EditCourseLinks
                courseLinks={courseLinks}
                handleAddLink={handleAddLink}
                handleDeleteCourseLinks={handleDeleteCourseLinks}
                handleLinkChange={handleLinkChange}
              />
              <div className="add-course-bottom-inputs">
                <label className="add-course-input-label">
                  <p>توضیح کوتاه</p>
                  <textarea
                    required
                    value={courseShortDesc}
                    className="add-course-input add-course-text-area"
                    name="courseShortDisc"
                    onChange={(e) => setcourseShortDesc(() => e.target.value)}
                  />
                </label>

                <label className="add-course-input-label">
                  <p>توضیح کامل</p>
                  <textarea
                    required
                    value={courseLongDesc}
                    className="add-course-input add-course-text-area"
                    name="courseLongDisc"
                    onChange={(e) => setcourseLongDesc(() => e.target.value)}
                  ></textarea>
                </label>
              </div>
            </div>
            <div
              className="add-course-form-submit-btn-container"
              onClick={handleFormSubmit}
            >
              <button
                className="add-course-form-submit-btn"
                type="submit"
                disabled={isDisabled}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditCourse;
