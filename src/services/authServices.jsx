import { Post } from "./index";

export const signUpApi = async (payload) => {
  return Post({ url: `/auth/signup`, payload });
};
export const signInApi = async (payload) => {
  return Post({ url: `/auth/signin`, payload });
};
