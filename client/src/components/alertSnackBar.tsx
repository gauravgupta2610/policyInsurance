import { Alert, Snackbar } from "@mui/material";
import React from "react";

type AlertSnackBarProps = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning" ;
  setOpen?: ((arg:boolean) => void)
};
const AlertSnackBar = (props: AlertSnackBarProps) => {
  const {setOpen} = props
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if(setOpen)
      setOpen(false)
  };



  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;
