import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Typography } from "@mui/material";
import TopBar from "../components/topBar";
import ProjectConst from "../const/projectConstants.json";
import InfoCard from "../components/infoCard";
import NotSelected from "../components/notSelected";
import DataBase from "../const/dataBase.json"
import { employeeList } from "../services/employeeServices";
import { EmployeeListProps } from "../propTypes";
import PolicyDependentList from "../components/policyDependentList";


const EmployeePage = () => {
  const roleType = true;
  const name = DataBase[0].name
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const [employeesListArr, setEmployeesList] = useState<EmployeeListProps[]>([]);

  const getEmployeeList = async () => {
    const data = await employeeList();
    setEmployeesList(data);
  }

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <div className="employeePage">
      <SideBar>
        <Box>
          <TopBar />
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                flexGrow: "0.7",
                height: '83vh',
                borderRight: "1px solid #E0E0E0",
              }}
            >
              {employeesListArr.map((val) => {
                return (
                  <InfoCard
                    key={`info${val.id}`}
                    userId={val.id}
                    name={val.name}
                    dob={val.dob}
                    empCode={val?.company_id}
                    relation={"Self"}
                    roleType={roleType}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                flexGrow: 0.3,
                // height: "80vh",
                display: selectedEmployee ? "" : "flex",
                justifyContent: selectedEmployee ? "" : "center",
                alignItems: selectedEmployee ? "" : "center",
              }}
            >
              <Box sx={{ textAlign: selectedEmployee ? "" : "center" }}>
                {selectedEmployee ? (
                  <PolicyDependentList empId={selectedEmployee}/>
                ) : (
                  <NotSelected roleType={roleType} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </SideBar>
    </div>
  );
};

export default EmployeePage;
