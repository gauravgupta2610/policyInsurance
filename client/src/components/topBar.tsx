import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleEntryIcon from "../icon/singleEntryIcon";
import BulkEntryIcon from "../icon/bulkEntryIcon";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";
import RightDrawer from "./rightDrawer";
import AddEditDependent from "./AddEditDependent";
import { addDependent, editDependent } from "../services/employeeServices";
import { dependentProps } from "../propTypes";
import AlertSnackBar from "./alertSnackBar";

const TopBar = ({ loading, setLoading, openDrawer, setOpenDrawer, editDept, setEditDept, getDependentList }: { openDrawer?: boolean; setOpenDrawer?: (val: boolean) => void; loading?: boolean, setLoading?: (val: boolean) => void; editDept?: dependentProps | null, getDependentList?: any; setEditDept?: any; }) => {
  const [storedValue] = useLocalStorage('userRole');
  const [userId] = useLocalStorage("userId");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [openUploadWindow, setOpenUploadWindow] = useState<boolean>(false)
  const open = Boolean(anchorEl);
  const [openAlert, setOpenAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning"
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenUploadWindow(true)
    navigate("/singleEntryForm", { replace: true });
  };
  const handleDependent = async (name: string, dob: string, relation: string) => {
    if (setLoading) setLoading(true);
    try {
      if (!editDept) {
        await addDependent({
          empId: userId,
          name: name,
          dob: dob,
          relation: relation
        });
        setOpenAlert({
          open: true,
          message: "Dependent successfully added.",
          severity: "success",
        });
      } else {
        await editDependent({
          empId: userId,
          deptId: editDept?.id,
          name: name,
          dob: dob,
          relation: relation
        })
        setEditDept()
        setOpenAlert({
          open: true,
          message: "Dependent successfully updated.",
          severity: "success",
        });
      }
      if (setLoading && setOpenDrawer) {
        setLoading(false);
        setOpenDrawer(false);
        // window.location.reload();
        getDependentList();
      }
    } catch (ex) {
      console.log(ex);
      setOpenAlert({
        open: true,
        message: "Something went wrong!",
        severity: "error",
      });
      if (setLoading)
        setLoading(false);
    }
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#EDF5FF",
          borderBottom: "1px solid #E0E0E0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box p={2}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#27378C",
            }}
          >
            {storedValue !== "EMPLOYEE" ? "Employees" : "Dependents"}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#27378C",
            }}
          >
            {storedValue !== "EMPLOYEE" ? "Manage all the employees from here" : "Manage all the dependents from here"}

          </Typography>
        </Box>
        <Box p={2} sx={{ display: "flex", alignItems: "center" }}>
          {storedValue !== "EMPLOYEE" ? (
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Button variant="outlined" sx={{ marginRight: "16px" }}>Reports</Button>
              <Button
                variant="contained"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<SingleEntryIcon />}>Add Employees</Button>
            </Box>
          ) : (
            <Button
              variant="contained"
                onClick={() => {
                  setEditDept();
                if (setOpenDrawer)
                  setOpenDrawer(true)
              }}
              startIcon={<SingleEntryIcon />}
            >Add Dependents</Button>
          )}
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SingleEntryIcon />
            </ListItemIcon>
            <ListItemText>Single Entry</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <BulkEntryIcon />
            </ListItemIcon>
            <ListItemText>Bulk Entry</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      <AlertSnackBar
        open={openAlert?.open}
        message={openAlert?.message}
        severity={openAlert?.severity}
        setOpen={() => {
          setOpenAlert({
            open: false,
            message: "",
            severity: "info",
          })
        }}
      />
      {setOpenDrawer && <RightDrawer
        open={openDrawer || false}
        setOpen={setOpenDrawer}
      >
        <AddEditDependent
          closeDrawer={setOpenDrawer}
          handleDependent={handleDependent}
          loading={loading || false}
          editDept={editDept}
        />
      </RightDrawer>}
    </>
  );
};

export default TopBar;
