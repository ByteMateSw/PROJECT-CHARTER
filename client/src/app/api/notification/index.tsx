import axios from 'axios'

export const createNotification = async (id: number, contractor: number, title: string, description: string) => {
    try {
        const response = await axios.post(`
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/create?id=${id}&contractor=${contractor}`, {
                title,
                description
            })
            return response.data
    } catch (error) {
        console.error(error)
    }
}