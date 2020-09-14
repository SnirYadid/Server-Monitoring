// require
const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
const port = 8080;
const nodemailer = require("nodemailer");
var cpuUsed = 0;
var pids;
// set backround URL
var yellow =
  "https://lh3.googleusercontent.com/AyILvdXo4xjOh8jvLSgeUgCDr20wYZ-1LdGv4qHl5CfpRi7QfHNcLNL-n62fbd6qyA";
var green = "https://vistapointe.net/images/green-1.jpg";
var red =
  "https://www.badimli.co.il/pub/media/catalog/product/cache/712f2a2d3d56554a7dae14a8e6ab103f/c/o/cottonred.jpg";

// initialize()
var app = express();
app.use(cors());

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "servermonitor36@gmail.com",
    pass: "g13579sm",
  },
});
app.get("/", function (req, res) {
  async function system() {
    try {
      const system = await si.system();
      const cpu = await si.cpu();
      const temp = await si.cpuTemperature();
      const mem = await si.mem();
      const osinfo = await si.osInfo();
      const networkInterfaces = await si.networkInterfaces();
      const networkStats = await si.networkStats();
      const user = await si.users();
      pids = await si.processes();
      const localStorge = await si.diskLayout();
      const extraStorge = await si.fsSize();
      var memUsed = 0;
      cpuUsed = 0;
      for (var i = 0; i < pids.list.length; i++) {
        cpuUsed = cpuUsed + pids.list[i].pcpuu;
        memUsed = memUsed + pids.list[i].pmem;
        if (pids.list[i].pcpu > 0.7 && pids.list[i].pcpu < 3) {
          pids.list[i]["background_color"] = yellow;
        }
        if (pids.list[i].pcpu > 3) {
          pids.list[i]["background_color"] = red;
        }
        if (pids.list[i].pcpu < 0.7) {
          pids.list[i]["background_color"] = green;
        }
      }
      mailOptions = {
        from: "servermonitor36@gmail.com",
        to: "snirya1@gmail.com",
        subject: "CPU OVERLOADED",
        html:
          "<div style='text-align:left; color:black; font-size:22px'><p style='text-align:left; color:black; font-size:22px'>The server " +
          system.manufacturer +
          " is in Overloaded with " +
          Math.round(cpuUsed) +
          "% Usage <br/> <b style='text-align:left; color:black; font-size:22px'>Please be aware</b> <br/><br style='text-align:left; color:black; font-size:22px'/>,Best regards <br>Server Monitoring Inc</p><img src='https://i.imgur.com/iaHaHsK.jpg'></div>",
      };

      res.json({
        memUsed: memUsed,
        cpuUsed: cpuUsed,
        computer: system,
        cpu: { cpu, temp },
        memory: mem,
        os: osinfo,
        network: { networkInterfaces, networkStats, user },
        Cstorge: localStorge,
        Dstorge: extraStorge,
        allpid: pids.all,
        listpid: pids.list,
      });
    } catch (e) {
      console.log(e);
    }
  }
  system();
});

app.listen(port, "0.0.0.0", () => console.log("Listening to port:  " + port));
setInterval(sendNotify, 30000);

function sendNotify() {
  if (cpuUsed > 70) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
