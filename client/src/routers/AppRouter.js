import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AboutUsPage from "../components/AboutUsPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import ContactUsPage from "../components/ContactUsPage";
import Footer from "../components/Footer";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import Dashboard from "../components/Dashboard";
import setAutherizationToken from "../utils/setAutherizationToken";
import { startSetCurrentUser } from "../Actions/user";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const AppRouter = (props) => {
  //check local storage to see if token exists
  if (localStorage.jwtToken) {
    setAutherizationToken(localStorage.jwtToken);
    console.log("jwt token set at app router", localStorage.jwtToken);
    props.dispatch(startSetCurrentUser());
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/aboutus" component={AboutUsPage} />
          <Route path="/contactus" component={ContactUsPage} />
          <PublicRoute
            path="/login"
            component={LoginPage}
            isAuth={props.isAuth}
          />
          <PublicRoute
            path="/register"
            component={RegisterPage}
            isAuth={props.isAuth}
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            isAuth={props.isAuth}
          />

          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(AppRouter);
