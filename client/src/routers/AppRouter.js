import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import AboutUsPage from "../components/AboutUsPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import ContactUsPage from "../components/ContactUsPage";
import Footer from "../components/Footer";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import Dashboard from "../components/Dashboard";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/aboutus" component={AboutUsPage} />
        <Route path="/contactus" component={ContactUsPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={Dashboard} />

        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

// <Switch>
// <Route path="/" component={ExpenseDashboardPage} exact={true} />
// <Route path="/create" component={AddExpensePage} />
// <Route path="/edit/:id" component={EditExpensePage} />
// <Route path="/help" component={HelpPage} />
// <Route component={NotFoundPage} />
// </Switch>

export default AppRouter;
