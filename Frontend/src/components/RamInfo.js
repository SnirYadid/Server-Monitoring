import React, { Component } from "react";

class RAMInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="area-graph">
        <div className="chart-header">RAM Memory Info</div>
        <div className="memInfo">
          <ResponsiveContainer minHeight={300}>
            <h3>Total RAM Storge - {this.state.totalMemDisplay}</h3>

            <Gauge
              value={this.state.usedMemDisplay}
              max={this.state.totalMemDisplay}
              width="200"
              height="120"
              label="Memory Used"
            />
            <Gauge
              value={this.state.freeMemDisplay}
              max={this.state.totalMemDisplay}
              width="200"
              height="120"
              label="Free Memory"
            />
          </ResponsiveContainer>
        </div>{" "}
      </div>
    );
  }
}

export default RAMInfo;
