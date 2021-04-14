import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LangCustomSelect from "./LangCustomSelect";
import ThemeCustomSelect from "./ThemeCustomSelect";
import { startUserLogOut } from "../Actions/user";
import HeaderProfile from "./HeaderProfile";

export const Header = (props) => {
  const handleLogOut = () => {
    props.dispatch(startUserLogOut(props.token));
  };

  const handleLogoutMenu = () => {
    return (
      <div>
        <NavLink to="/Login" activeClassName="selected">
          ورود
        </NavLink>
        <NavLink to="/register" activeClassName="selected">
          ثبت نام
        </NavLink>
      </div>
    );
  };

  const handleLoginMenu = () => {
    return (
      <div className="loginMenu">
        <HeaderProfile userName={props.userName} userId={props.id} />
        <Link className="logout-text" to="/" onClick={handleLogOut}>
          خروج
        </Link>
      </div>
    );
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
            <NavLink to="/dashboard" activeClassName="selected">
              پروفایل کاربری
            </NavLink>
            <NavLink to="/course" activeClassName="selected">
              دسته بندی دوره ها
            </NavLink>
            <NavLink to="/aboutus" activeClassName="selected">
              درباره ما
            </NavLink>
            <NavLink to="/contactus" activeClassName="selected">
              تماس با ما
            </NavLink>
            {props.isAuthenticated && handleLoginMenu()}
            {!props.isAuthenticated && handleLogoutMenu()}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.user.isAuth,
    token: state.user.token,
    userName: state.user.name,
    id: state.user.id,
  };
};

export default connect(mapStateToProps)(Header);
