import axios from "axios";

export const getProfessions= async()=>{
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/offices/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}