import React, { Component } from "react";
// import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import MainDashboard from "./components/mainDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/dashboard">
              <MainDashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

// const Home = () => (
//   <div>
//     <h1>HOME PAGE</h1>
//     <p>Hi Dushbags This is the HOME Component</p>
//   </div>
// );
export default App;
