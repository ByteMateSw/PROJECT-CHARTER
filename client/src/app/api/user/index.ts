import axios from "axios";
import { User } from "../interface";

export const getBestUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get('http://localhost:3001/user/best-users');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
