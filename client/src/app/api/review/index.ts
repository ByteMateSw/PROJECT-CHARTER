import axios from 'axios'

export const getScore = async (userId: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/score/${userId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllReviews = async (page: number, limit: number, userId: number) => {
    try {
        const response = await axios.get(`
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews?page=${page}&limit=${limit}&userId=${userId}`)
            return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const createReview = async (
    userId: number,
    contractor: number,
    score: number,
    description: string,
    hiring: string
) => {
    try {
        const response = await axios.post(`
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/create?userId=${userId}&contractor=${contractor}`, {
                score,
                description,
                hiring
            })
            return response.data;
    } catch (error) {
        console.error(error)
    }
}