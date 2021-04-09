import React from "react";
import { Link, NavLink } from "react-router-dom";
import LangCustomSelect from "./LangCustomSelect";
import ThemeCustomSelect from "./ThemeCustomSelect";

const Header = () => {
  return (
    <div id="nav-container">
      <Link to="/" className="logo-container">
        <h1 id="logo">
          QD<span>X</span>
        </h1>
      </Link>
      <div id="left-nav-container">
        <nav>
          <ul id="nav-links">
            <NavLink to="#">دسته بندی دوره ها</NavLink>
            <NavLink to="/aboutus">درباره ما</NavLink>
            <NavLink to="/contactus">تماس با ما</NavLink>
          </ul>
        </nav>
        <LangCustomSelect className="#language" />
        <ThemeCustomSelect />
      </div>
    </div>
  );
};

export default Header;
