import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          <Typography className="infoBox_title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="infoBox_cases">{cases}</h2>
          <Typography className="infoBox_total" color="textSecondary">
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
