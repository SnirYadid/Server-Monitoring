import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <i className="fa fa-line-chart" aria-hidden="true" />
        <a href="http://localhost:3000/">CPU USAGE DASHBOARD</a>{" "}
      </div>
    );
  }
}

export default Header;
