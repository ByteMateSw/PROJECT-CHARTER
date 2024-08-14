import axios from "axios";

// Función para obtener todas las provincias
export const getProvinces = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/provinces`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para obtener las ciudades en función de la provincia seleccionada
export const getCities = async (provinceId: string | number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cities`,
      {
        params: {
          provinceId: provinceId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar la relación de la ciudad con el usuario
export const updateCityUserByName = async (
  cityName: string,
  userId: number
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cities/updateCityUserByName`,
      {
        cityName,
        userId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
