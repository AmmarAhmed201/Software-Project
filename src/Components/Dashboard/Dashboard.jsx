import React, { Component } from "react";
import TopLabel from "./TopLabel";
import Pills from "./Pills";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <TopLabel />
        <Pills onClickMe={this.props.onClickMe} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
