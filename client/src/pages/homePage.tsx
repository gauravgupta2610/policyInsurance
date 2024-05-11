import React, { useEffect } from "react"

import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField"

import { loginUser } from "../services/loginServices"
import { loggedInUserProps } from "../propTypes"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { redirectHandle } from "../routes/protectedRoute"


const HomePage = () => {
  const navigate = useNavigate()
  const [storedValue] = useLocalStorage('userRole');
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [userNameError, setUserNameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>("")
  

  useEffect(() => {
    if (storedValue) {
      redirectHandle(storedValue, navigate);
    }
  }, [storedValue])
  const handleSubmit = async () => {
    if (userName === "" || password === "") {
      if (userName === "") {
        setUserNameError(true)
      }
      if (password === "") {
        setPasswordError(true)
      }
      setAlertMessage("Please Fill the Required Fields")
    } else {
      try {
        const userExist: loggedInUserProps | undefined = await loginUser(userName, password);
        if (userExist) {
          localStorage.setItem("userRole", userExist.role)
          localStorage.setItem("userId", userExist.id.toString())
          localStorage.setItem("name", userExist.name)
          localStorage.setItem("isUserLogin", "yes");
          if (userExist.role === "HR_MANAGER") {
            window.location.replace("/dependents")
            // navigate("/dependents", { replace: true })
          } else if (userExist.role === "EMPLOYEE") {
            window.location.replace("/employee")

            // navigate("/employee", { replace: true })
          } else {
            navigate("/", { replace: true })
          }
        } else {
          setAlertMessage("UserName and Password is incorrect.");
        }
      } catch (ex: any) {
        console.log(ex);
        setAlertMessage("UserName and Password is incorrect.");
      }
    }
  }

  return (
    <Box
      className="homePage"
      p={3}
      marginTop={5}
      mx={"auto"}
      border={"1px solid #1976d2"}
      width={"50%"}
    >
      <Typography variant="h3" color={"primary"}>
        Policy Insurance Login
      </Typography>
      <Box
        p={1}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Typography variant="subtitle2" color={"primary"}>
          User Name{" "}
          <Typography component="span" color={"error"}>
            *
          </Typography>
        </Typography>
        <TextField
          error={userNameError}
          id="outlined-error"
          value={userName}
          placeholder="Enter Username"
          sx={{ p: 0 }}
          onChange={e => {
            setUserName(e.target.value)
            setUserNameError(false)
            setAlertMessage("")
          }}
          inputProps={{
            autoComplete: "off"
          }}
        />
      </Box>
      <Box
        p={1}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Typography variant="subtitle2" color={"primary"}>
          Password{" "}
          <Typography component="span" color={"error"}>
            *
          </Typography>
        </Typography>
        <TextField
          error={passwordError}
          inputProps={{
            autoComplete: "new-password"
          }}
          type="password"
          placeholder="Enter Password"
          // variant="out"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setPasswordError(false)
            setAlertMessage("")
          }}
          sx={{ p: 0 }}
        />
      </Box>
      {alertMessage &&
        <Typography variant="subtitle2" color={"error"} sx={{ m: 1 }}>
          {alertMessage}
        </Typography>}
      <Button
        variant="contained"
        // type="submit"
        onClick={handleSubmit}
        sx={{ m: 1 }}
      >
        SUBMIT
      </Button>
      {/* <AlertSnackBar
        open={openAlert}
        message={alertMessage}
        severity={alertType}
        setOpen={setOpenAlert}
      /> */}
    </Box>
  )
}

export default HomePage
