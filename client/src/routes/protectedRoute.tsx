import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const redirectHandle = (storedValue: string | null, navigate: any) => {
  if (storedValue=== "HR_MANAGER") {
    navigate("/employee", { replace: true });
  } else if (storedValue === "EMPLOYEE") {
    navigate("/dependents", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
} 

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage('userRole');
  useEffect(() => {
    if (storedValue) {
      redirectHandle(storedValue, navigate);
    }
  }, [storedValue]);

  return (<Outlet />);
};

export default ProtectedRoutes;
