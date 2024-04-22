import axios from "axios";

export const getProfessions= async()=>{
  try {
    const response = await axios.get("https://political-jenn-bytemate.koyeb.app/offices/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}