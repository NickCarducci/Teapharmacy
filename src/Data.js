import React from "react";
import { data } from "./datadata";

export const shortNumber = (scler, notRound) => {
  var newnum = String(Math.round(scler));
  if (notRound) newnum = String(scler);
  var app = null;
  var decimal = null;
  const suff = ["", "k", "m", "b", "t"];
  for (let i = 0; i < suff.length; i++) {
    if (newnum.length > 3) {
      decimal = newnum[newnum.length - 3];
      newnum = newnum.substring(0, newnum.length - 3);
    } else {
      app = i;
      break;
    }
  }
  return newnum + (decimal ? "." + decimal : "") + suff[app];
};

class Data extends React.Component {
  constructor(props) {
    super(props);
    let dates = [];
    let noData = [];
    var amphetamines = [];
    var oxymorphone = [];
    var powderopium = [];
    var morphine = [];
    var oxycodine = [];
    var methadone = [];
    var fentanyl = [];
    var codine = [];
    var cocaine = [];
    var cannabicyclol = [];
    data.forEach((x) => {
      const date = new Date(x.date + "-01").getTime();
      dates.push(date);
      noData.push([date, 0]);
      amphetamines.push([date, x.Amphetamine]);
      oxymorphone.push([date, x.Oxymorphone]);
      powderopium.push([date, x.PowderedOpium]);
      morphine.push([date, x.Morphine]);
      oxycodine.push([date, x.Oxycodone]);
      methadone.push([date, x.Methadone]);
      fentanyl.push([date, x.Fentanyl]);
      codine.push([date, x.Codeine]);
      cocaine.push([date, x.Cocaine]);
      cannabicyclol.push([date, x.Cannabicyclol]);
    });
    const num = (a) => a.map((x) => x[1]);
    const all = [
      ...num(amphetamines),
      ...num(oxymorphone),
      ...num(powderopium),
      ...num(morphine),
      ...num(oxycodine),
      ...num(methadone),
      ...num(fentanyl),
      ...num(codine),
      ...num(cocaine),
      ...num(cannabicyclol)
    ];
    var lowDate = Math.min(...dates);
    var highDate = Math.max(...dates);
    var highdruguse = Math.max(...all);
    var lowdruguse = Math.min(...all);
    noData.sort((a, b) => a[0] - b[0]);
    var state = {
      amphetamines,
      oxymorphone,
      powderopium,
      morphine,
      oxycodine,
      methadone,
      fentanyl,
      codine,
      cocaine,
      cannabicyclol,
      lowdruguse,
      dates,
      noData,
      yAxis: highdruguse - lowdruguse,
      xAxis: highDate - lowDate,
      lowDate,
      highDate,
      highdruguse
    };
    this.state = state;
  }

  render() {
    const linecss = {
      display: "flex",
      position: "absolute",
      width: "100%",
      height: "200px",
      transform: "scale(1,-1)"
    };
    const drugs = [
      "amphetamines",
      "oxymorphone",
      "powderopium",
      "morphine",
      "oxycodine",
      "methadone",
      "fentanyl",
      "codine",
      "cocaine",
      "cannabicyclol"
    ];
    const stroke = (a) => {
      var stroke = null;
      if (a === "amphetamines") {
        stroke = "purple";
      } else if (a === "oxymorphone") {
        stroke = "orange";
      } else if (a === "powderopium") {
        stroke = "red";
      } else if (a === "morphine") {
        stroke = "pink";
      } else if (a === "oxycodine") {
        stroke = "gold";
      } else if (a === "methadone") {
        stroke = "brown";
      } else if (a === "fentanyl") {
        stroke = "teal";
      } else if (a === "codine") {
        stroke = "blue";
      } else if (a === "cocaine") {
        stroke = "black";
      } else if (a === "cannabicyclol") {
        stroke = "green";
      }
      return stroke;
    };
    return (
      <div
        style={{
          position: "relative",
          left: "0px",
          width: "100%"
        }}
      >
        <div
          style={{
            right: "0px",
            maxWidth: "50%",
            top: "0px",
            height: "min-content",
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            zIndex: "9",
            backgroundColor: "rgba(250,250,250,.6)"
          }}
        >
          highest retail scripts -&nbsp;
          <div
            style={{
              top: "0px",
              height: "min-content",
              display: "flex",
              position: "relative",
              right: "0px"
            }}
          >
            {shortNumber(this.state.highdruguse)}
          </div>
        </div>
        <div style={{ height: "200px" }}>
          <svg style={linecss} xmlns="http://www.w3.org/2000/svg">
            {this.state.noData.map(
              ([x, y], i) =>
                !isNaN(x) &&
                !isNaN(y) && (
                  <rect
                    x={
                      ((x - this.state.lowDate) / this.state.xAxis) *
                      this.props.width *
                      0.9
                    }
                    y={
                      ((y - this.state.lowdruguse) / this.state.highdruguse) *
                      150
                    }
                    width={1}
                    height={1}
                    stroke="rgb(230,230,230)"
                    fill="transparent"
                    strokeWidth=""
                    key={i}
                  />
                )
            )}
          </svg>

          <svg style={linecss} xmlns="http://www.w3.org/2000/svg">
            {drugs.map((a) =>
              this.state[a].map(([x, y], i) => {
                return (
                  <rect
                    x={
                      ((x - this.state.lowDate) / this.state.xAxis) *
                      this.props.width *
                      0.9
                    }
                    y={
                      ((y - this.state.lowdruguse) / this.state.highdruguse) *
                      150
                    }
                    width={3}
                    height={3}
                    stroke={stroke(a)}
                    fill="transparent"
                    strokeWidth={2}
                    key={a + i}
                  />
                );
              })
            )}
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {drugs.map((x) => {
            return (
              <div key={x} style={{ padding: "4px 10px", color: stroke(x) }}>
                {x}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Data;
