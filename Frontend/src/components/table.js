import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class BasicTable extends Component {
  render() {
    const items = this.props.items;

    return (
      <div>
        <Table striped bordered hover size="lg" id="Table">
          <thead>
            <tr>
              <th>Server Name</th>
              <th>IPV4 Address</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr>
                  <td>
                    <Link to={"/dashboard?address=" + item.ipv4 + ""}>
                      {item.serverName}
                    </Link>
                  </td>
                  <td>{item.ipv4}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="float-right"
                      onClick={() => this.props.handleDeleteRow(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BasicTable;
