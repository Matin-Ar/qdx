import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        if ((res.status = 200)) {
          setCategories(res.data);
          console.log("categories array is", categories);
        }
      })
      .catch((err) => console.log(err));
  }, [categories.length]);

  return (
    <div className="allCategoriesPage-wrapper">
      <div className="favcategory-container">
        {categories &&
          categories.map((category) => {
            return (
              <div className="single-category-container">{category.name}</div>
            );
          })}
      </div>
    </div>
  );
}
