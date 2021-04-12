import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LangCustomSelect from "./LangCustomSelect";
import ThemeCustomSelect from "./ThemeCustomSelect";
import { startUserLogOut } from "../Actions/user";

export const Header = (props) => {
  const handleLogOut = () => {
    props.dispatch(startUserLogOut(props.token));
  };

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
            <NavLink to="/dashboard">پروفایل کاربری</NavLink>

            <NavLink to="#">دسته بندی دوره ها</NavLink>
            <NavLink to="/aboutus">درباره ما</NavLink>
            <NavLink to="/contactus">تماس با ما</NavLink>
            {!props.isAuthenticated && <NavLink to="/Login">ورود</NavLink>}
            {!props.isAuthenticated && (
              <NavLink to="/register">ثبت نام</NavLink>
            )}
            {props.isAuthenticated && (
              <Link to="/" onClick={handleLogOut}>
                خروج
              </Link>
            )}
          </ul>
        </nav>
        <LangCustomSelect className="#language" />
        <ThemeCustomSelect />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.user.token,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(Header);
