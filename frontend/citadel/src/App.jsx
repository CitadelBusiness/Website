import React from "react";
import { Outlet } from "react-router-dom";
import TabContainer from "./components/tab-navigation/TabContainer";

export default class App extends React.Component {
  render() {
    return (
      <>
        <TabContainer />
        <Outlet />
      </>
    );
  }
}
