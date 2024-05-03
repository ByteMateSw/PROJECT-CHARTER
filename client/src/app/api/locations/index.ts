import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProvinces = async () => {
  try {
    const response = await axios.get(`https://political-jenn-bytemate.koyeb.app/provinces`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCities = async () => {
  try {
    const response = await axios.get(`https://political-jenn-bytemate.koyeb.app/cities`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
