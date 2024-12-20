import axios from 'axios'

export const createHiring = async (contractorId: number, contractedId: number) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hirings`, {
            contractorId,
            contractedId
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateStateHiring = async (id: number, state: any) => {
    try {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hirings/state/${id}`, {
            state
        })
    } catch (error) {
        console.error(error)
    }
}