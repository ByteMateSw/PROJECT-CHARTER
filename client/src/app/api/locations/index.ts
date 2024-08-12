import axios from "axios";

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/provinces`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCities = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cities`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
