import React from "react";
import angularICON from "../assets/categories/angular.png";
import cSharpICON from "../assets/categories/c-sharp.png";
import javaICON from "../assets/categories/java.png";
import javascriptICON from "../assets/categories/javascript.png";
import nodejsICON from "../assets/categories/nodejs.png";
import pythonICON from "../assets/categories/python.png";
import reactjsICON from "../assets/categories/reactjs.png";
import typescriptICON from "../assets/categories/typescript.png";

export default function FavCategory() {
  return (
    <div className="favcategory-container">
      <h1 className="favcategory-title">محبوب ترین دسته بندی ها</h1>
      <div className="category-wrapper">
        <div className="single-category-container">
          <img src={javascriptICON}></img>
          <p>JAVASCRIPT</p>
        </div>
        <div className="single-category-container">
          <img src={reactjsICON}></img>
          <p>ReactJS</p>
        </div>
        <div className="single-category-container">
          <img src={pythonICON}></img>
          <p>PYTHON</p>
        </div>
        <div className="single-category-container">
          <img src={javaICON}></img>
          <p>JAVA</p>
        </div>
        <div className="single-category-container">
          <img src={cSharpICON}></img>
          <p>C-Sharp</p>
        </div>
        <div className="single-category-container">
          <img src={angularICON}></img>
          <p>Angular</p>
        </div>
        <div className="single-category-container">
          <img src={typescriptICON}></img>
          <p>TypeScript</p>
        </div>
        <div className="single-category-container">
          <img src={nodejsICON}></img>
          <p>NODE JS</p>
        </div>
      </div>
      <button className="default-button favcategory-button">
        دسته بندی های بیشتر
      </button>
    </div>
  );
}
