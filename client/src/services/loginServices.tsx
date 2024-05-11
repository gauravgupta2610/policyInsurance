import axios, { AxiosResponse } from 'axios'
import { loggedInUserProps } from "../propTypes";
import { BASE_URL } from "../const/app";

export const loginUser  = async (userName: string, password: string) => {
  const data = {
    userName: userName,
    password: password
  }
  const response: AxiosResponse = await axios.post(BASE_URL + '/login', data);
  const responseData: loggedInUserProps = response.data;
  return responseData;
}
