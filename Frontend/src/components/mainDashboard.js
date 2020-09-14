import React, { Component } from "react";
import MeterChart from "./MeterChart";
import AreaGraph from "./AreaGraph";
import Gauge from "react-svg-gauge";
import "../App.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Alert from "react-bootstrap/Alert";

class mainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 1,
      cpuUseDisplay: 0,
      memUseDisplay: 0,
      pidList: [],
      port: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    //const port = urlParams.get("port");
    const serverAddress = urlParams.get("address");
    const URL = "http://" + serverAddress + ":8080/";

    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({
          //SYSTEM INFO
          serverName: responseJson.computer.manufacturer,
          serverModel: responseJson.computer.model,
          cpuProducer: responseJson.cpu.cpu.manufacturer,
          serverBrand: responseJson.cpu.cpu.brand,
          numOfCores: responseJson.cpu.cpu.cores,

          //CPU
          cpuUseDisplay: Math.round(responseJson.cpuUsed),
          //  MEMORY
          totalMemDisplay: Math.round(responseJson.memory.total / 1073741824),
          freeMemDisplay: Math.round(responseJson.memory.free / 1073741824),
          usedMemDisplay:
            Math.round(responseJson.memory.total / 1073741824) -
            Math.round(responseJson.memory.free / 1073741824),
          totalDiskStorge: Math.round(
            responseJson.Dstorge[0].size / 1073741824
          ),
          usedDiskStorge: Math.round(responseJson.Dstorge[0].use),
          pidList: responseJson.listpid,
          seconds: this.state.seconds + 1,
        });
      });
  }

  componentDidMount() {
    setInterval(this.fetchData, 1000);
  }

  render() {
    return (
      <div className="container">
        <div className="area-graph">
          {" "}
          <div className="chart-header">Server Info</div>
          <div className="serverInfo">
            <Alert variant="secondary">
              <h5>Server Name: {this.state.serverName}</h5>
              <hr />
              <h5>Server Model: {this.state.serverModel}</h5>
              <hr />
              <h5>CPU Producer: {this.state.cpuProducer}</h5>
              <hr />
              <h5>Server Brand: {this.state.serverBrand}</h5>
              <hr />
              <h5>Number Of Cores: {this.state.numOfCores}</h5>
            </Alert>
          </div>
        </div>
        <div className="area-graph">
          <div className="chart-header">RAM Memory Info</div>
          <h3>Total RAM Storge - {this.state.totalMemDisplay} Gb</h3>
          <div className="memInfo">
            <Gauge
              value={this.state.usedMemDisplay}
              max={this.state.totalMemDisplay}
              width="200"
              height="170"
              label="Memory Used"
            />
            <Gauge
              value={this.state.freeMemDisplay}
              max={this.state.totalMemDisplay}
              width="200"
              height="170"
              label="Free Memory"
            />
          </div>{" "}
        </div>
        <div className="area-graph">
          <div className="chart-header">Disk Memory Info</div>
          <h3>Total Disk Storge - {this.state.totalDiskStorge} Gb</h3>

          <div className="Dstorge">
            <Gauge
              value={this.state.usedDiskStorge}
              width="200"
              height="170"
              label="Used Memory"
            />
          </div>
        </div>
        <div>
          <MeterChart avgValue={this.state.cpuUseDisplay} />
        </div>
        <div>
          <AreaGraph
            avgValue={this.state.cpuUseDisplay}
            seconds={this.state.seconds}
          />
        </div>
        <div className="PROCESS">
          <GridList cellHeight={120} cols={5} className="gridList limit">
            <GridListTile key="Procces" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">Procces</ListSubheader>
            </GridListTile>
            {this.state.pidList
              .filter((tile) => tile.pcpu > 0.1)
              .map((tile) => (
                <GridListTile key={tile.name}>
                  <img src={tile.background_color} alt={tile.name} />
                  <GridListTileBar
                    title={tile.name}
                    subtitle={<span>CPU Usage: {tile.pcpu}</span>}
                    actionIcon={
                      <IconButton aria-label={`info about ${tile.name}`}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default mainDashboard;
