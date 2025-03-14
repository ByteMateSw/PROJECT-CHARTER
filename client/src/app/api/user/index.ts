import axios from "axios";
import { User } from "../interface";
import { json } from "stream/consumers";

export const getBestUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/best-users`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByScore = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/score`
    )
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export const register = async (user: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      user
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const googleLogin = async (user: { name: string; email: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
      user
    );
  } catch (error) {
    return error;
  }
};

export const googleAccountVerify = async (email: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/google-verify?email=${email}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getUserOffices = async (userId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/offices/${userId}`
    )
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getUserByEmail = async (email: string) => {
  try{
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/by-email?email=${email}`
    )
    return response.data;
  } catch (error) {
    return error
  }
}

export const updateUser = async (id: number, updateUserDto: any) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
      updateUserDto
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const getWorkers = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/workers`
    );    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async (page?: number, limit?: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      {
        params: {
          page,
          limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUsersFilter = async (page: number, limit: number, habilities: string, location: string, offices: string[]) => {
  try {
    const response = await axios.get(`
      ${process.env.NEXT_PUBLIC_BACKEND_URL}/users/filter?page=${page}&limit=${limit}&habilities=${habilities}&location=${location}&offices=${JSON.stringify(offices)}`)
      return response.data;
  } catch (error) {
    console.error(error)
  }
}

export const updateCity = async (userId: number, cityId: number) => {
  try {
    const response = await axios.patch(`
      ${process.env.NEXT_PUBLIC_BACKEND_URL}/users/update-city/${userId}?cityId=${cityId}`)
      return response.data;
  } catch (error) {
    console.error(error)
  }
}