import React from "react";
import Button from "react-bootstrap/Button";
import { Row, Col, Form } from "react-bootstrap";

class myForm extends React.Component {
  render() {
    return (
      <div id="Form">
        <form onSubmit={this.props.handleFormSubmit}>
          <Row>
            <Col>
              <Form.Control
                id="serverName"
                value={this.props.newUsername}
                type="text"
                name="serverName"
                placeholder="Server Name"
                onChange={this.props.handleInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="ipv4"
                value={this.props.newPassword}
                type="text"
                name="ipv4"
                placeholder="IPv4 Address"
                onChange={this.props.handleInputChange}
              />
            </Col>
          </Row>{" "}
          <br></br>
          <Button
            type="submit"
            value="Submit"
            variant="outline-primary"
            size="lg"
            block
          >
            Add Server
          </Button>
        </form>
      </div>
    );
  }
}

export default myForm;
