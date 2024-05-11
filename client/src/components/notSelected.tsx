import { Box, Typography } from "@mui/material";
import React from "react";
import NotSelectedIcon from "../icon/notSelectedIcon";

type NotSelectedProps = {
  roleType: boolean;
};
const NotSelected = (props: NotSelectedProps) => {
  return (
    <Box>
        <NotSelectedIcon />
        <Typography variant="subtitle2">
          {props.roleType ? "No Employee Selected" : "No Dependent Selected"}
        </Typography>
        <Typography variant="caption" sx={{ color: "#667085" }}>
          {props.roleType
            ? "Please select an employee to view details"
            : "Please select a dependent to view details"}
        </Typography>
    </Box>
  );
};

export default NotSelected;
