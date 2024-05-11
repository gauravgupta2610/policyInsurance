import { Drawer } from "@mui/material";
import { LeftDrawerProps } from "../propTypes";
import React from "react";

export default function RightDrawer({ children, open, setOpen }: LeftDrawerProps) {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      sx={{width: "250px"}}
      onClose={toggleDrawer(false)}
    >
      {children}
    </Drawer>
  )
}