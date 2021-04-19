import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProfileEditTab from "./ProfileEditTab";
import editUserIMG from "../assets/Dashboard/edit-user.png";
import adminIMG from "../assets/Dashboard/admin.png";
import addCourseIMG from "../assets/Dashboard/add-course.png";
import dashboardIMG from "../assets/Dashboard/dashboard.png";
import AddCourseTab from "./AddCourseTab";
import AddCourseCategory from "./AddCourseCategory";
import AddCourseTutorial from "./AddCourseTutorial";

const CustomTabPanel = ({ children, myCustomProp, ...otherProps }) => (
  <TabPanel {...otherProps}>
    <h1>{children}</h1>
    {myCustomProp && `myCustomProp: ${myCustomProp}`}
  </TabPanel>
);

CustomTabPanel.tabsRole = "TabPanel";

export default class DashboardPage extends Component {
  render() {
    return (
      <div className="dashboard-Container">
        <div className="dashboard-content-wrapper">
          <Tabs
            className="react-tabs dashboard-tabs-pannel"
            disabledTabClassName="react-tabs__tab--disabled dashboard-tabs-disabled-tab"
            selectedTabClassName="react-tabs__tab--selected dashboard-tabs-selected-tab"
            selectedTabPanelClassName="react-tabs__tab-panel--selected dashboard-tabs-selected-pannel"
          >
            <TabList className="react-tabs__tab-list dashboard-tabs-tablist">
              <Tab>
                <img src={dashboardIMG} />
                داشبورد
              </Tab>
              <Tab>
                <img src={editUserIMG} />
                ویرایش حساب کاربری
              </Tab>
              <Tab>
                <img src={adminIMG} />
                پنل مدیریت
              </Tab>
              <Tab>
                <img src={addCourseIMG} />
                افزودن دسته بندی دوره
              </Tab>
              <Tab>
                <img src={addCourseIMG} />
                افزودن زبان های برنامه نویسی
              </Tab>
              <Tab>
                <img src={addCourseIMG} />
                افزودن دوره
              </Tab>
            </TabList>
            <CustomTabPanel>Dashboard Tab</CustomTabPanel>
            <CustomTabPanel>
              <ProfileEditTab />
            </CustomTabPanel>
            <CustomTabPanel>addmin Tab</CustomTabPanel>
            <CustomTabPanel>
              <AddCourseCategory />
            </CustomTabPanel>
            <CustomTabPanel>
              <AddCourseTutorial />
            </CustomTabPanel>
            <CustomTabPanel>
              <AddCourseTab />
            </CustomTabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
