/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ActionCard = ({ action, user, timestamp, sx }) => {
  return (
    <Card variant="outlined" sx={sx}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="p"><HistoryIcon /> {action}</Typography>
        <Typography variant="p"><PersonIcon /> {user}</Typography>
        <Typography variant="p"><AccessTimeIcon /> {timestamp}</Typography>
      </CardContent>
    </Card >
  );
};

ActionCard.propTypes = {
  action: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
};

export default ActionCard;
