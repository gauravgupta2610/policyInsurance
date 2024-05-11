import { Box, Button, CircularProgress, Divider, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RELATION } from "../const/app";
import { dependentProps } from "../propTypes";

interface Props {
  closeDrawer?: (val: boolean) => void;
  handleDependent: (name: string, dob: string, relation: string) => void;
  loading: boolean;
  editDept?: dependentProps | null;
}
export default function AddEditDependent({ closeDrawer, handleDependent, loading, editDept }: Props) {
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [relation, setRelation] = useState<string>("");
  const [error, setError] = useState({
    name: false,
    dob: false,
    relation: false,
  })
  const resetForm = () => {
    setName("");
    setDob("");
    setRelation("");
    if (closeDrawer) {
      closeDrawer(false);
    }
  }

  const saveDependent = (name: string, dob: string, relation: string) => {
    if (name === "" || dob === "" || relation === "") {
      setError({
        name: name === "",
        dob: dob === "",
        relation: relation === "",
      })
    } else {
      setError({
        name: false,
        dob: false,
        relation: false,
      })
      handleDependent(name, dob, relation);
    }
  }

  useEffect(() => {
    if (editDept) {
      setName(editDept?.name);
      setDob(editDept?.dob);
      setRelation(editDept?.relation ? editDept?.relation.toLowerCase() : "")
    }
  }, [editDept])

  return (
    <Box sx={{ width: "25vw" }}>
      <Box p={2}>
        <Typography variant="h4">
          {!editDept ? "Add a Dependent" : "Edit a Dependent"}
        </Typography>
        <Typography component="span">
          {!editDept ? "Add a dependent of Employee" : "Edit a dependent of Employee"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Box mt={1}>
          <Typography>
            Name <Typography component={"span"} color={"error"}>*</Typography>
          </Typography>
          <TextField
            error={error.name}
            fullWidth
            value={name}
            placeholder="Enter here"
            onChange={(e) => { setName(e.target.value) }}
          />
        </Box>
        <Box mt={1}>
          <Typography>
            Date of Birth <Typography component={"span"} color={"error"}>*</Typography>
          </Typography>
          <TextField
            error={error.dob}
            type="date"
            fullWidth
            value={dob}
            onChange={(e) => { setDob(e.target.value) }}
          />
        </Box>
        <Box mt={1}>
          <Typography>
            Relation <Typography component={"span"} color={"error"}>*</Typography>
          </Typography>
          <Select
            error={error.relation}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={relation}
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={(event: SelectChangeEvent) => {
              setRelation(event.target.value as string);
            }}
            displayEmpty
          >
            <MenuItem value="">
              Select Relation
            </MenuItem>
            {Object.values(RELATION).map((val: string) => {
              return (
                <MenuItem value={val} key={val}>
                  {val}
                </MenuItem>
              )
            })}
          </Select>
        </Box>
      </Box>
      <Divider />
      {(error.name || error.dob || error.relation) && <Typography sx={{ p: 2 }} color={"error"}>
        Please fill all required field
      </Typography>}
      <Stack
        flexDirection={'row'}
        justifyContent={"space-around"}
        p={2}
      >

        <Button
          variant="outlined"
          color="error"
          onClick={resetForm}
        >
          Discard
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          onClick={() => saveDependent(name, dob, relation)}
        >
          {loading && <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />}
          {!editDept ? "Save & Add" : "Update"}
        </Button>
      </Stack>
    </Box>
  )
}