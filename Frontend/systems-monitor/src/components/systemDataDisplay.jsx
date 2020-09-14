import React, { Component } from "react";
class systemDataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            data: json,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h1>Memory Used - {data.memUsed}</h1>
          <h1>CPU Used - {data.cpuUsed}</h1>
          <h1> Total Process Number - {data.allpid}</h1>
        </React.Fragment>
      );
    }
  }
}
export default systemDataDisplay;
