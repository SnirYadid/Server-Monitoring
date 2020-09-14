import React, { Component } from "react";
import Form from "./Form";
import MyTable from "./table";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      serverName: "",
      ipv4: "",
      items: [
        { serverName: "Sport 5", ipv4: "127.0.0.1" },
        { serverName: "One", ipv4: "192.168.0.16" },
      ],
    };
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
  }

  handleDeleteRow(i) {
    let rows = [...this.state.items];
    console.log(i);
    rows.splice(i, 1);
    this.setState({
      items: rows,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    let items = [...this.state.items];

    items.push({
      serverName: this.state.serverName,
      ipv4: this.state.ipv4,
    });

    this.setState({
      items,
      serverName: "",
      ipv4: "",
    });
  };

  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div class="container">
        <h1 class="text-center">SERVER MONITORING Inc</h1>
        <MyTable
          items={this.state.items}
          handleDeleteRow={this.handleDeleteRow}
        />
        <Form
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          newUsername={this.state.serverName}
          newPassword={this.state.ipv4}
        />
      </div>
    );
  }
}

export default Home;
