import { Get } from "./index";

export const GetProfile = async (username) => {
  return Get({ url: `/users/${username}` });
};
export const GetReadMe = async (username) => {
  return Get({
    url: `/repos/${username}/${username}/readme`,
  });
};
export const GetFollowers = async (username) => {
  return Get({
    url: `/users/${username}/followers`,
  });
};
export const GetRepositories = async (username) => {
  return Get({
    url: `/users/${username}/repos`,
  });
};
