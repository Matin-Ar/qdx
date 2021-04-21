import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./skeleton/Skeleton";

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    axios.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, [categories.length]);

  useEffect(() => {
    setFinalList(categories);
    categories.map(async (category) => {
      await axios
        .get(`/categories/${category.name}`)
        .then((res) => {
          const mysub = res.data;
          category.subCategories = mysub;
        })
        .then(() => {
          setFinalList([...categories]);

          console.log("the finellist hhas been set to ", finalList);
        });
    });
  }, [categories.length]);

  return (
    <div className="allCategoriesPage-wrapper">
      <div className="allCategoriesPage-container">
        {finalList &&
          finalList.map((category) => {
            return (
              <React.Fragment>
                <div className="single-category-wrapper-main-cat ">
                  {category.name}
                </div>
                {category.subCategories &&
                  category.subCategories.map((subcategory) => {
                    return (
                      <Link to={`/categories/${subcategory.name}`}>
                        <div className="single-category-wrapper">
                          {subcategory.name}
                          <div className="single-category-img-container">
                            <img
                              className="single-category-image"
                              src={`http://localhost:3001/tutorials/${subcategory.name}/avatar`}
                            ></img>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

// {category.subCategories.map((subcategory) => {
//   <div>{subcategory.name}</div>;
// })}

// const [tutorials, setTutorials] = useState([]);

// useEffect(() => {
//   axios
//     .get("/tutorials")
//     .then((res) => {
//       if ((res.status = 200)) {
//         setTutorials(res.data);
//         console.log("categories array is", tutorials);
//       }
//     })
//     .catch((err) => console.log(err));
// }, [tutorials.length]);

// return (
//   <div className="allCategoriesPage-wrapper">
//     <div className="allCategoriesPage-container">
//       {tutorials.length === 0 && (
//         <React.Fragment>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//           <div className="single-category-wrapper">
//             <Skeleton type="text" />

//             <div className="single-category-img-container">
//               <Skeleton type="thumbnail" />
//             </div>
//           </div>
//         </React.Fragment>
//       )}

//       <div className="single-category-wrapper">
//         "Front-end"
//         <div className="single-category-img-container">
//           {" "}
//           <img className="single-category-image" src={frontEndIMG}></img>
//         </div>
//       </div>

//       {tutorials &&
//         tutorials.map((tutorial) => {
//           return (
//             <div className="single-category-wrapper">
//               {tutorial.name}{" "}
//               <div className="single-category-img-container">
//                 {" "}
//                 <img
//                   className="single-category-image"
//                   src={`http://localhost:3001/tutorials/${tutorial.name}/avatar`}
//                 ></img>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   </div>
// );
