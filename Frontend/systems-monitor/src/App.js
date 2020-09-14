import React, { Component } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import SystemDataDisplay from "./components/systemDataDisplay";
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <SystemDataDisplay />
        </main>{" "}
      </React.Fragment>
    );
  }
}

export default App;
