import { Card, CardContent, formatMs, Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import React from "react";
import "./InfoBox.css";
import numeral from "numeral";
import { prettyPrintStat } from "./utils";
function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <Card
        className="infoBox"
        onClick={props.onClick}
        style={
          active
            ? isRed
              ? { borderTop: "10px solid red" }
              : { borderTop: "10px solid greenyellow", cursor: "pointer" }
            : {}
        }
      >
        <CardContent style={{ color: "green !important" }}>
          <Typography className="infoBox_title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="infoBox_cases" style={{ color: "rgb(204, 16, 52)" }}>
            {prettyPrintStat(cases)}
          </h2>
          <Typography className="infoBox_total" color="textSecondary">
            {numeral(total).format("0.0a")} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
