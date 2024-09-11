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