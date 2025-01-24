import axios from "axios";
import { createJobTypes } from "../interface";

export const createJob = async (data: createJobTypes) => {
    try {
        const response = await axios.post(`
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/create`, {
                data
            })
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const getJobsByUser = async (userId: number) => {
    try {
        const response = await axios.get(`
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${userId}`)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}