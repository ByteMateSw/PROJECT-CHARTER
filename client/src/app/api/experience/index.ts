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

export const createExperience = async (
    title: string, 
    description: string, 
    company: string, 
    startDate: Date, 
    endDate: Date, 
    userId: number) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/save`, {
                    title,
                    description,
                    company,
                    startDate,
                    endDate,
                    userId
                }
            )
            return response
        } catch (error) {
            console.error(error)
        }
}

export const updateExperience = async (id: number, data: any) => {
    try {
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/update/${id}`, 
            data
        )
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteExperience = async (id: number) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/delete/${id}`
        )
    } catch (error) {
        console.error(error)
    }
}