import React, { useState } from "react";
import Sidebar from "./sideBar";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import TopBar from "./topBar";
import AddIcon from "../icon/addIcon";
import BulkEntryIcon from "../icon/bulkEntryIcon";
import ShareBoxLineIcon from "../icon/shareBoxLineIcon";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SingleEntryForm = () => {

    const [alignment, setAlignment] = useState<string>('male')
  return (
    <div className="employeePage">
      <Sidebar>
        <Box>
          <TopBar />
          <Box sx={{ display: "flex" }}>
            <Box>
              <Box
                sx={{
                  width: "45vw",
                  padding: "24px",
                  display: "grid",
                  borderBottom: "1px solid #E0E0E0",
                  borderRight: "1px solid #E0E0E0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      User Name{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField placeholder="Full Name" sx={{ width: "100%" }} />
                  </Box>
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Employee ID{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      placeholder="Company employee id"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Employee Designation{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      placeholder="Designation"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Date of Joining{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      placeholder="dd/mm/yy"
                      sx={{ width: "100%" }}
                      type="date"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Date of Birth{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      placeholder="dd/mm/yy"
                      sx={{ width: "100%" }}
                      type="date"
                    />
                  </Box>
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Gender{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    {/* <TextField placeholder="Gender" sx={{ width: "100%" }} /> */}
                    <ToggleButtonGroup
                    fullWidth
                      color="primary"
                      value={alignment}
                      exclusive
                    //   onChange={handleChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="male">male</ToggleButton>
                      <ToggleButton value="female">female</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Mobile Number{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      placeholder="without country code"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box sx={{ width: "22vw" }}>
                    <Typography variant="subtitle1">
                      Email{" "}
                      <Typography component="span" color={"error"}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      placeholder="corporate email id"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  borderRight: "1px solid #E0E0E0",
                  height: "100%",
                  padding: "24px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#8F8F8F", marginBottom: "10px" }}
                >
                  Add Dependents
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "56px",
                    border: "1px dashed #27378C",
                    textTransform: "none",
                    color: "#27378C",
                    display: "flex",
                    justifyContent: "flex-start",
                    backgroundColor: "#EDF5FF",
                  }}
                  size="large"
                >
                  Add a Dependent
                </Button>
              </Box>
            </Box>
            <Box sx={{ padding: "24px", width: "100%" }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#8F8F8F", marginBottom: "10px" }}
                >
                  Select Insurance and Sum Insured
                </Typography>
              </Box>
              <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "8px" }}>
                <Box
                  sx={{
                    backgroundColor: "#EDFFF3",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox {...label} />
                  <Typography variant="subtitle1" sx={{ color: "#056B2E" }}>
                    Selected
                  </Typography>
                </Box>
                <Box sx={{ padding: "16px 20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h5">
                          Group Health Insurance
                        </Typography>
                        <ShareBoxLineIcon />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#8F8F8F" }}
                        >
                          Employees and family covered
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <BulkEntryIcon />
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button variant="outlined" sx={{ width: "30%" }}>
                      20,000
                    </Button>
                    <Button variant="outlined" sx={{ width: "30%" }}>
                      20,000
                    </Button>
                    <Button variant="outlined" sx={{ width: "30%" }}>
                      20,000
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Sidebar>
    </div>
  );
};

export default SingleEntryForm;
