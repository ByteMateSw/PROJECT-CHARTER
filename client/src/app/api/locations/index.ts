import axios from "axios";

export const getProvinces = async () => {
  try {
    const response = await axios.get("http://localhost:3032/province/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCities = async () => {
  try {
    const response = await axios.get("http://localhost:3032/city/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};
