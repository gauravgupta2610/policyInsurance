import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { Avatar, Typography } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";
import NotificationIcon from "../icon/notifictionIcon";
import HomeIcon from "../icon/homeIcon";
import ListCheckIcon from "../icon/listCheckIcon";
import BulkEntryIcon from "../icon/bulkEntryIcon";
import FileAddIcon from "../icon/fileAddIcon";
import HospitalIcon from "../icon/hospitalIcon";
import ProfileIcon from "../icon/profileIcon";
import { stringAvatar } from "../helper/helper";

const drawerWidth = 20;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: JSX.Element[] | JSX.Element;
}

export default function Sidebar(props: Props) {
  const [storedValue] = useLocalStorage("name");
  const [userRole] = useLocalStorage("userRole");
  const navigate = useNavigate();
  const hrSidebar = [
    { value: "Employees", icon: <BulkEntryIcon /> },
    { value: "Corporate Claims", icon: <FileAddIcon /> },
  ];

  const empSideBar = [
    { value: "Dependents", icon: <BulkEntryIcon /> },
  ];

  const sidebarArr = [
    { value: "Notifications", icon: <NotificationIcon /> },
    { value: "Home", icon: <HomeIcon /> },
    { value: "Plans", icon: <ListCheckIcon /> },
    { value: "Claims", icon: <FileAddIcon /> },
    { value: "Hospitals", icon: <HospitalIcon /> },
    { value: "Profile", icon: <ProfileIcon /> },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  const drawer = (
    <div>
      {storedValue !== "undefined" && (
        <ListItem key={storedValue}>
          <Avatar {...stringAvatar(storedValue)} />
          <ListItemText primary={storedValue} />
        </ListItem>
      )}
      <Divider />
      <List>
        {[...sidebarArr, ...(userRole === "EMPLOYEE" ? empSideBar : hrSidebar)].map((text, index) => (
          <ListItem key={text?.value} disablePadding>
            <ListItemButton>
              {text?.icon && <ListItemIcon>{text?.icon}</ListItemIcon>}
              <Typography color={(text?.value === "Employees" || text?.value === "Dependents")? "primary" : ""}>{text?.value} </Typography>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"Logout"} disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: `${drawerWidth}vw` }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: `${drawerWidth}vw`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ width: { sm: `78vw` } }}>{props.children}</Box>
    </Box>
  );
}
