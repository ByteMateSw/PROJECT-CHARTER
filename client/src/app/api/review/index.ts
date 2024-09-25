import axios from 'axios'

export const getScore = async (userId: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/score/${userId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}