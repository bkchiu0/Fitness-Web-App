import config from "config.json";

export const baseURL = config.baseAPIPath;

export const createUser = baseURL + "/auth/users";

export const deleteUser = baseURL + "/auth/users";

export const loginUser = baseURL + "/auth/users/login";
