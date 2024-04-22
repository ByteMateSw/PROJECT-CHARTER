import axios from "axios";

export const getProfessions= async()=>{
  try {
    const response = await axios.get("http://localhost:3001/offices/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}