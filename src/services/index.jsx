import { GitAxiosInstance, LocalAxiosInstance } from "./axiosInstance";

export const authToken = process.env.NEXT_PUBLIC_GIT_TOKEN;

export async function Post(data) {
  return await LocalAxiosInstance.post(data.url, data.payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        return {
          message: error.message,
          status: false,
        };
      }
    });
}

export async function Get(data) {
  if (authToken)
    GitAxiosInstance.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${authToken}`;
  return await GitAxiosInstance.get(data.url)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        return {
          message: error.message,
          status: false,
        };
      }
    });
}
