import axios from 'axios'

export const getAllPosts = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  export const getPostsByUserName = async (userName: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${userName}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }

  export const subscribePost = async (userId: number, postId: number) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/apply/?userId=${userId}&postId=${postId}`
      )
      return response
    } catch (error) {
      return error
    }
  }

  export const createPost = async (
    userId: string, 
    title: string,
    description: string,
    searchVector: string,
    cityId: number,
    price: number
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${userId}`, {
          title,
          description,
          searchVector,
          city: cityId,
          price,
        }
      )
    } catch (error) {
      return error
    }
  }