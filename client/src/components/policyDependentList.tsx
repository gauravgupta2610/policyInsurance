import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import GroupIcon from "../icon/groupIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "../icon/infoIcon";
import DataBase from "../const/dataBase.json";
import InfoCard from "./infoCard";

type PolicyDependentListProps = {
  empId: number;
};

const PolicyDependentList = ({ empId }: PolicyDependentListProps) => {
  const emplyeeDetail = DataBase.filter((val) => empId === val.id);

  return (
    <Box>
      <Box
        sx={{
          borderBottom: "2px solid #27378C",
          color: "#27378C",
          display: "flex",
          alignItems: "center",
          // width: "100%",
          padding: "16px 20px",
        }}
      >
        <Typography variant="subtitle2">Policy Dependents</Typography>
      </Box>
      <Box>
        <Box
          sx={{
            margin: "20px 24px",
            border: "1px solid #E0E0E0",
            borderRadius: "8px",
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: "#FFEDED", height: "54px" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton disabled color="primary" size="large">
                    <GroupIcon />
                  </IconButton>
                  <Typography>Policy Dependents</Typography>
                </Box>
                <Box>
                  <Typography>`{(emplyeeDetail[0].dependents).length + 1}/4`</Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#1A1A1A",
                    }}
                  >
                    <Typography variant="subtitle2">Dependents</Typography>
                    <IconButton disabled color="primary" size="small">
                      <InfoIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Typography variant="caption">
                      Self,Father,Spouse
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <InfoCard
                    name={emplyeeDetail[0].name}
                    relation={emplyeeDetail[0].relation}
                    dob={emplyeeDetail[0].dob}
                    keepButton={false}
                  />
                  {emplyeeDetail[0].dependents.map((val, index) => {
                    return (
                      <InfoCard
                        name={val.name}
                        relation={val.relation}
                        dob={val.dob}
                        keepButton={false}
                      />
                    );
                  })}
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      color: "#27378C",
                      borderColor: "#27378C",
                      textTransform: "none",
                    }}
                  >
                    Edit Details
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyDependentList;
