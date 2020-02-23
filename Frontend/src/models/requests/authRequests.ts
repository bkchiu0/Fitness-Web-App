import { AxiosResponse } from "axios";

import RequestBuilder from "models/requests/builder";
import * as api from "models/requests/api";
import HttpMethod from "models/requests/http";

export type RegisterUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const registerUser = async (
  request: RegisterUserRequest
): Promise<AxiosResponse<void>> => {
  return new RequestBuilder<void, RegisterUserRequest, void>()
    .setEndpoint(api.createUser)
    .setHttpMethod(HttpMethod.POST)
    .setRequestBody(request)
    .build();
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export const loginUser = async (
  request: LoginUserRequest
): Promise<AxiosResponse<void>> => {
  return new RequestBuilder<void, LoginUserRequest, void>()
    .setEndpoint(api.loginUser)
    .setHttpMethod(HttpMethod.POST)
    .setRequestBody(request)
    .build();
};
