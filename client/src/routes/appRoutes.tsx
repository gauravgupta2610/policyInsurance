import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";
import ProtectedRoutes from "./protectedRoute";
import NotFound from "../pages/notFound";
import DependentList from "../pages/dependentList";
import EmployeePage from "../pages/employeePage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SingleEntryForm from "../components/singleEntryForm";

const AppRoutes = () => {
  const [userId] = useLocalStorage('userId');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dependents" element={<DependentList userId={userId} />} />
          {/* singleEntryForm */}
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/employee" element={<EmployeePage/>} />
          <Route path="/singleEntryForm" element={<SingleEntryForm/>} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
