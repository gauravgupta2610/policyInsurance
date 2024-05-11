import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { redirectHandle } from "../routes/protectedRoute";

export default function NotFound() {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage('userRole');

  useEffect(() => {
    if (storedValue) {
      redirectHandle(storedValue, navigate);
    }
  }, [storedValue]);
  return (
    <></>
  );
}
