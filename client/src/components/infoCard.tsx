import { Avatar, Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import EditIcon from "../icon/editIcon";
import DeleteIcon from "../icon/deleteIcon";
import ActionIcon from "../icon/actionIcon";
import { stringAvatar } from "../helper/helper";
import { InfoCardPorps } from "../propTypes";



const InfoCard = ({
  userId,
  name,
  dob,
  relation,
  roleType,
  empCode,
  selectedEmployee,
  keepButton = true,
  depId,
  handleEdit,
  handleDelete,
  setSelectedEmployee,
}: InfoCardPorps) => {
  const handleEmployeeClick = (employeeId: number) => {
    if (employeeId && setSelectedEmployee) setSelectedEmployee(employeeId);
  };

  return (
    <Card
      sx={{
        display: "flex",
        border: "1px solid ",
        borderColor: selectedEmployee === userId ? '#27378C' : "#E0E0E0",
        height: "10vh",
        borderRadius: "8px",
        padding: "16px",
        margin: "24px",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: keepButton ? "auto": "300px",
      }}
      onClick={() => {
        if (userId && roleType) {
          handleEmployeeClick(userId);
        }
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box>
          <Avatar {...stringAvatar(name)}/>
        </Box>
        <Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", marginLeft: "12px" }}
            >
              {name}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "12px" }}
          >
            <Typography>{roleType ? empCode : dob}</Typography>&nbsp;|&nbsp;
            <Typography>{roleType ? relation.replace("SELF", "EMPLOYEE") :relation }</Typography>
          </Box>
        </Box>
      </Box>
      {keepButton && (roleType ? (
        <Box>
          <IconButton disabled color="primary" size="large">
            <ActionIcon />
          </IconButton>
        </Box>
      ) : (
        <Box>
            <IconButton color="primary" size="large" onClick={() => {
              handleEdit(depId)
            }}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" size="large" onClick={() => {
              handleDelete(depId)
            }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Card>
  );
};

export default InfoCard;
