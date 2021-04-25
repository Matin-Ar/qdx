import React from "react";
import { Link } from "react-router-dom";

function RenderCollection({ collection }) {
  return (
    <>
      <div className="main-category-wrapper" key={collection.category}>
        {collection.category}
      </div>
      {collection.tutorials?.map((item) => {
        return (
          <Link className="category-links" to={`/categories/${item.name}`}>
            <div className="single-category-wrapper" key={item.name}>
              <div className="single-category-text">{item.name}</div>
              <div className="single-category-img-container">
                <img
                  className="single-category-image"
                  src={`http://localhost:3001/tutorials/${item.name}/avatar`}
                ></img>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default RenderCollection;
