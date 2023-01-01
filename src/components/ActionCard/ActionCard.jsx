/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

const ActionCard = ({ action, user, sx }) => {
  return (
    <Card variant="outlined" sx={sx}>
      <CardContent>
        <Typography variant="p">Action - {action}</Typography> <br />
        <Typography variant="p">User - {user}</Typography>
      </CardContent>
    </Card>
  );
};

ActionCard.propTypes = {
  action: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

export default ActionCard;
