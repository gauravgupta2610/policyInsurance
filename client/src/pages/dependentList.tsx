import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import TopBar from "../components/topBar";
import NotSelected from "../components/notSelected";
import InfoCard from "../components/infoCard";
import PolicyDependentList from "../components/policyDependentList";
import { deleteDependent, dependentList } from "../services/employeeServices";
import { dependentProps } from "../propTypes";
import AlertSnackBar from "../components/alertSnackBar";

const DependentList = ({ userId }: { userId: string }) => {
  const roleType = false;
  const [dependentListArr, setDependentList] = useState<dependentProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [editDept, setEditDept] = useState<dependentProps>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteDeptId, setDeleteDeptId] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning"
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const getDependentList = async () => {
    const data = await dependentList(userId);
    setDependentList(data);
  }

  const handleEdit = (deptId: string) => {
    setOpenDrawer(true);
    setEditDept(dependentListArr.find(val => val.id == deptId));
  }

  const handleDelete = (deptId: string) => {
    setModalOpen(true);
    setDeleteDeptId(deptId);
  }
  const handleDeleteDependent = async (deptId: string) => {
    try {
      await deleteDependent({ empId: userId, deptId: deptId });
      setModalOpen(false);
      setDeleteDeptId("");
      setOpenAlert({
        open: true,
        message: "Dependent successfully deleted.",
        severity: "success",
      });
      getDependentList();
    } catch (ex) {
      console.log(ex);
      setModalOpen(false);
      setOpenAlert({
        open: true,
        message: "Something went wrong!",
        severity: "error",
      });
    }
  }
  useEffect(() => {
    getDependentList();
  }, []);

  return (
    <div className="hrPage">
      <SideBar>
        <Box>
          <TopBar
            loading={loading}
            setLoading={setLoading}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            editDept={editDept}
            setEditDept={setEditDept}
            getDependentList={getDependentList}
          />
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                flexGrow: 0.7,
                height: "83vh",
                borderRight: "1px solid #E0E0E0",
              }}
            >
              {dependentListArr.map((val, index) => {
                return (
                  <InfoCard
                    userId={userId}
                    roleType={roleType}
                    depId={val.id}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    name={val.name}
                    dob={val.dob}
                    relation={val.relation}
                    key={index}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                flexGrow: 0.3,
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <NotSelected roleType={roleType} />
              </Box>
            </Box>
          </Box>
        </Box>
      </SideBar>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <DialogContent>
          <Typography>Are you sure you want to delete</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setModalOpen(false);
            setDeleteDeptId("");
          }}>
            Cancel
          </Button>
          <Button onClick={() => {
            handleDeleteDependent(deleteDeptId);
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
};

export default DependentList;
