import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dashboard from "../components/Dashboard";

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
              <Tab>Custom Tab 1</Tab>
              <Tab>ویرایش حساب کاربری</Tab>
            </TabList>
            <CustomTabPanel>Panel 1</CustomTabPanel>
            <CustomTabPanel>
              <Dashboard />
            </CustomTabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
