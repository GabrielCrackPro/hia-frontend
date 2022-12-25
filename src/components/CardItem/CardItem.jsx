/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Link, Typography, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/system";

const CardItem = ({ icon, title, sx }) => {
  const [data, setData] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  const { items, shops, locations } = loggedUser;
  useEffect(() => {
    if (title == "Items") {
      setData(items);
    } else if (title == "Shops") {
      setData(shops);
    } else {
      setData(locations);
    }
  }, []);
  const colors = useTheme().palette;
  return (
    <Card variant="outlined" sx={sx}>
      <CardContent>
        <Typography variant="h5">
          {icon} {title}
        </Typography>
        {
          data.length ?
            <>
              <Typography>Total: {data.length}</Typography>
              <Typography>Last added: {data[data.length - 1].name}</Typography>
              <Typography>Modified: {new Date(data[data.length - 1].updated_at).toLocaleString()}</Typography>
              <Box sx={{ marginTop: "5px" }}>
                <Link href={`/${title.toLowerCase()}`} color={colors.primary.main} underline="none" component="a" sx={{ ml: "5px", border: "1px solid currentcolor", padding: "5px" }}><ArrowForwardIosIcon sx={{ fontSize: "15px" }} />All {title}</Link>
              </Box>
            </>
            :
            <>
              <Typography variant="h5" color="#b8b9b9">No {title.toLowerCase()} yet</Typography>
            </>
        }
      </CardContent>
    </Card>
  );
};

CardItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};

export default CardItem;
