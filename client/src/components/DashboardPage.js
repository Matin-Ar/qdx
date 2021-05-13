import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import ProfileEditTab from "./ProfileEditTab";
import editUserIMG from "../assets/Dashboard/edit-user.png";
import adminIMG from "../assets/Dashboard/admin.png";
import addCourseIMG from "../assets/Dashboard/add-course.png";
import dashboardIMG from "../assets/Dashboard/dashboard.png";
import AddCourseTab from "./AddCourseTab";
import AddCourseCategory from "./AddCourseCategory";
import AddCourseTutorial from "./AddCourseTutorial";
import ManageCategoriesAndTutorials from "./table/ManageCategoriesAndTutorials";
import { Link } from "react-router-dom";

const CustomTabPanel = ({ children, myCustomProp, ...otherProps }) => (
  <TabPanel {...otherProps}>
    <h1>{children}</h1>
    {myCustomProp && `myCustomProp: ${myCustomProp}`}
  </TabPanel>
);

CustomTabPanel.tabsRole = "TabPanel";

export class DashboardPage extends Component {
  render(props) {
    return (
      <div className="dashboard-Container">
        <div className="dashboard-content-wrapper">
          <Tabs
            defaultIndex={1}
            className="react-tabs dashboard-tabs-pannel"
            disabledTabClassName="react-tabs__tab--disabled dashboard-tabs-disabled-tab"
            selectedTabClassName="react-tabs__tab--selected dashboard-tabs-selected-tab"
            selectedTabPanelClassName="react-tabs__tab-panel--selected dashboard-tabs-selected-pannel"
          >
            <TabList className="react-tabs__tab-list dashboard-tabs-tablist">
              <Tab disabled>
                <img src={dashboardIMG} />
                داشبورد
              </Tab>
              <Tab>
                <img src={editUserIMG} />
                ویرایش حساب کاربری
              </Tab>

              {this.props.isAdmin && (
                <Tab disabled>
                  <img src={adminIMG} />
                  پنل مدیریت
                </Tab>
              )}

              {this.props.isAdmin && (
                <Tab>
                  <Link
                    to="/ManageCategoriesAndTutorials"
                    className="courseandcategorymanagment-link"
                  >
                    <img src={addCourseIMG} /> مدیریت دسته بندی ها و زبان ها
                  </Link>
                </Tab>
              )}

              {this.props.isAdmin && (
                <Tab>
                  <img src={addCourseIMG} />
                  افزودن دوره
                </Tab>
              )}
            </TabList>

            <CustomTabPanel>Dashboard Tab</CustomTabPanel>

            <CustomTabPanel>
              <ProfileEditTab />
            </CustomTabPanel>

            {this.props.isAdmin && <CustomTabPanel>addmin Tab</CustomTabPanel>}

            {this.props.isAdmin && (
              <CustomTabPanel>manage dashboard</CustomTabPanel>
            )}

            {this.props.isAdmin && (
              <CustomTabPanel>
                <AddCourseTab />
              </CustomTabPanel>
            )}
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAdmin: state.user.role === "Admin" ? true : false,
});

export default connect(mapStateToProps)(DashboardPage);
