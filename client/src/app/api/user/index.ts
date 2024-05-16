import axios from "axios";
import { User } from "../interface";

const API_URL = process.env.REACT_APP_API_URL;

export const getBestUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(
      `https://political-jenn-bytemate.koyeb.app/user/best-users`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(
      `https://political-jenn-bytemate.koyeb.app/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (user: any) => {
  try {
    const response = await axios.post(
      `http://localhost:3032/auth/register`,
      user
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
