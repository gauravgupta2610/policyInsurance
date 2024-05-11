import axios, { AxiosResponse } from 'axios'
import { dependentProps, EmployeeListProps } from "../propTypes";
import { BASE_URL } from "../const/app";

export const dependentList  = async (empId: string) => {
  const response: AxiosResponse = await axios.get(`${BASE_URL}/dependents/${empId}`);
  const responseData: dependentProps[] = response.data?.dependents || [];
  return responseData;
}


export const addDependent = async (data: { empId: string; name: string; dob: string, relation: string; }) => {
  const response: AxiosResponse = await axios.post(`${BASE_URL}/add-dependent`, data);
  const responseData = response.data || [];
  return responseData;
}

export const editDependent = async (data: { empId: string; deptId: string; name: string; dob: string, relation: string; }) => {
  const response: AxiosResponse = await axios.put(`${BASE_URL}/edit-dependent`, data);
  const responseData = response.data || [];
  return responseData;
}

export const deleteDependent = async (data: { empId: string; deptId: string; }) => {
  const response: AxiosResponse = await axios.delete(`${BASE_URL}/delete-dependent/${data?.empId}/${data?.deptId}`);
  const responseData = response.data || [];
  return responseData;
}
export const employeeList  = async () => {
  const response: AxiosResponse = await axios.get(`${BASE_URL}/employees`);
  const responseData: EmployeeListProps[] = response.data || [];
  return responseData;
}