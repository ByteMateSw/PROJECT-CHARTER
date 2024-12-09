import axios from "axios";
import { createSocialTypes, updateSocialNetworkTypes } from "../interface";

export const createSocialNetwork = async (data: createSocialTypes) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/social-network/new`, data
        )
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getSocialNetworks = async (userId: number) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/social-network/${userId}`
        )
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const updateSocialNetworks = async (userId: number, data:updateSocialNetworkTypes) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/social-network/update?userId=${userId}`, 
            data
        )
    } catch (error) {
        console.error(error)
    }
}