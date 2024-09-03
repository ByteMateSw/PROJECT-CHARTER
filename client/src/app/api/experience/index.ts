import axios from 'axios';

export const getExperienceByUserId = async (id: number) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/user/${id}`
        )
        return response
    } catch (error) {
        console.error(error)
    }
}