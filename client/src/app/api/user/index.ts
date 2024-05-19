import axios from "axios";
import { User } from "../interface";

const API_URL = "https://political-jenn-bytemate.koyeb.app";
const LOCAL_URL = "http://localhost:3032";

export const getBestUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${LOCAL_URL}/user/best-users`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(
      `${LOCAL_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const register = async (user: any) => {
  try {
    const response = await axios.post(`${LOCAL_URL}/auth/register`, user);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
