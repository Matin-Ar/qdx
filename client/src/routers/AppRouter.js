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
import setAutherizationToken from "../utils/setAutherizationToken";
import { startSetCurrentUser } from "../Actions/user";
import { ReactQueryDevtools } from "react-query/devtools";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SingleCoursePage from "../components/SingleCoursePage";
import DashboardPage from "../components/DashboardPage";
import SpecificTutorialsPage from "../components/SpecificTutorialsPage";
import ManageCategoriesAndTutorials from "../components/table/ManageCategoriesAndTutorials";
import AllCategories from "../components/AllCategories";
import EditCourse from "../components/EditCourse";
import Services from "../components/Services";

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
          <Route
            path="/ManageCategoriesAndTutorials"
            component={ManageCategoriesAndTutorials}
          />
          <PrivateRoute
            path="/course/edit/:name"
            component={EditCourse}
            isAuth={props.isAuth}
          />
          <PrivateRoute
            path="/course/:courseName"
            component={SingleCoursePage}
            isAuth={props.isAuth}
          />
          <PrivateRoute
            path="/categories/:tutorial"
            component={SpecificTutorialsPage}
            isAuth={props.isAuth}
          />

          <PrivateRoute
            path="/categories/"
            component={AllCategories}
            isAuth={props.isAuth}
          />

          <PrivateRoute
            path="/Services"
            component={Services}
            isAuth={props.isAuth}
          />

          <PrivateRoute
            path="/dashboard"
            component={DashboardPage}
            isAuth={props.isAuth}
            exact={true}
          />
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

          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
        <ReactQueryDevtools />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(AppRouter);
